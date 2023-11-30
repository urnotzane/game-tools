use crate::utils::execute_command;
use reqwest;
use serde::{Deserialize, Serialize};
use serde_json::{ Map, Value};

#[derive(Deserialize, Serialize)]
pub struct RemoteData {
    pub remote_token: String,
    pub port: String,
}

pub fn get_remote_data_by_key(key: &str) -> String {
    let cmd_res = execute_command("wmic PROCESS WHERE name='LeagueClientUx.exe' GET commandline");
    let col: Vec<_> = cmd_res.split("\"--").collect();
    let mut value: String = String::new();
    for item in col {
        let temp: Vec<_> = item.split("=").collect();
        if temp[0] == key {
            value = temp[1].replace("\"", "").trim().to_string();
        }
    }
    value
}

pub fn get_remote_data() -> RemoteData {
    RemoteData {
        remote_token: get_remote_data_by_key("remoting-auth-token"),
        port: get_remote_data_by_key("app-port"),
    }
}

pub async fn get_lol_version() -> Result<String, reqwest::Error> {
  let res_str = reqwest::get("https://ddragon.leagueoflegends.com/api/versions.json")
    .await.unwrap()
    .text()
    .await.unwrap();
  
  let json_str: Result<Vec<&str>, serde_json::Error> = serde_json::from_str(&res_str);

  Ok(json_str.unwrap()[0].to_owned())
}

pub async fn get_champions() -> Result<Map<String, Value>, reqwest::Error> {
  let version = get_lol_version().await.unwrap();
  let url = format!("https://ddragon.leagueoflegends.com/cdn/{}/data/zh_CN/champion.json", version);
  let res_str = reqwest::get(url)
    .await.unwrap()
    .text()
    .await.unwrap();

  let json_parsed: Result<Map<String, Value>, serde_json::Error> = serde_json::from_str(&res_str);
  Ok(json_parsed.unwrap())
}
