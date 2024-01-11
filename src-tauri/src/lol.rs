use std::{collections::HashMap, thread, time::Duration};

use crate::utils::{execute_command, read_json_file};
use reqwest;
use serde::{Deserialize, Serialize};
use serde_json::{Map, Value};

#[derive(Deserialize, Serialize)]
pub struct RemoteData {
    pub remote_token: String,
    pub port: String,
}
#[derive(Deserialize, Serialize)]
pub struct GptMsg {
    role: String,
    content: String,
}
#[derive(Deserialize, Serialize)]
pub struct GptData {
    model: String,
    messages: Vec<GptMsg>,
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
        .await
        .unwrap()
        .text()
        .await
        .unwrap();

    let json_str: Result<Vec<&str>, serde_json::Error> = serde_json::from_str(&res_str);

    Ok(json_str.unwrap()[0].to_owned())
}

pub async fn get_champions() -> Result<Map<String, Value>, reqwest::Error> {
    let version = get_lol_version().await.unwrap();
    let url = format!(
        "https://ddragon.leagueoflegends.com/cdn/{}/data/zh_CN/champion.json",
        version
    );
    let res_str = reqwest::get(url).await.unwrap().text().await.unwrap();

    let json_parsed: Result<Map<String, Value>, serde_json::Error> = serde_json::from_str(&res_str);
    Ok(json_parsed.unwrap())
}

pub async fn get_champion(champion_id: &str) -> Result<Map<String, Value>, reqwest::Error> {
    let version = get_lol_version().await.unwrap();
    let url = format!(
        "https://ddragon.leagueoflegends.com/cdn/{}/data/zh_CN/champion/{}.json",
        version, champion_id
    );
    let res_str = reqwest::get(url).await.unwrap().text().await.unwrap();

    let json_parsed: Result<Map<String, Value>, serde_json::Error> = serde_json::from_str(&res_str);
    Ok(json_parsed.unwrap())
}

pub async fn spells_summary(champ_id: &str) -> HashMap<String, Value> {
    let config = read_json_file("./local/config.json");
    let ai_api = config.get("ai_api").unwrap().as_str().unwrap();
    let authorization = format!(
        "Bearer {}",
        config.get("ai_token").unwrap().as_str().unwrap()
    );
    let model = config.get("ai_model").unwrap().as_str().unwrap();

    let mut messages: Vec<GptMsg> = Vec::new();
    messages.push(GptMsg {
      role: "user".to_string(),
      content: "给你一段关于英雄联盟里英雄技能的json数据，请为我提供一个如何使用这个英雄技能的建议，字数不超过150字。
      格式为：XXX是一个什么样的英雄，他的技能分别是什么，技能连招是怎样的。
      不允许出现json这四个字
      现在可以开始了吗？".to_string(),
    });
    messages.push(GptMsg {
        role: "assistant".to_string(),
        content: "当然可以！请您提供一段关于英雄联盟里英雄技能的数据，然后我会为您详细解析技能连招。"
            .to_string(),
    });
    let champ_res = get_champion(champ_id).await;
    match champ_res {
        Ok(champ_data) => {
            let champ_data = champ_data.get("data").unwrap();
            let champ = &champ_data[champ_id.to_string()];
            let spells = &champ["spells"];
            messages.push(GptMsg {
                role: "user".to_string(),
                content: spells.to_string(),
            });
        }
        Err(err) => {
            println!("champ_res: {}", err);
        }
    }
    let body_data = GptData {
        model: model.to_owned().to_string(),
        messages,
    };
    let client = reqwest::Client::new();
    let res = client
        .post(format!("{}/api/v1/chat-api/create", ai_api))
        .header("Authorization", authorization.clone())
        .header("Content-Type", "application/json")
        .json(&serde_json::json!(&body_data))
        .send()
        .await;
    let mut response: HashMap<String, Value> = HashMap::new();
    match res {
        Ok(res) => {
            let creator_res =
                serde_json::from_str::<HashMap<String, Value>>(&res.text().await.unwrap()).unwrap();
            let process_id = creator_res.get("data").unwrap();
            let process_id = &process_id["id".to_string()];
            loop {
                thread::sleep(Duration::from_millis(1000));
                let gpt_res = client
                    .get(format!(
                        "{}/api/v1/chat-api/progress/{}",
                        ai_api,
                        process_id.as_str().unwrap()
                    ))
                    .header("Authorization", authorization.clone())
                    .header("Content-Type", "application/json")
                    .send()
                    .await
                    .unwrap();

                let response_str = gpt_res.text().await.unwrap();
                response = serde_json::from_str::<HashMap<String, Value>>(&response_str).unwrap();
                let hash_res = response.get("data");
                match hash_res {
                    Some(hash_res) => {
                        if hash_res == &Value::Null {
                            continue;
                        } else {
                            break;
                        }
                    }
                    None => todo!(),
                }
            }
        }
        Err(err) => {
            println!("chat-api/create: {}", err)
        }
    }
    return response;
}
