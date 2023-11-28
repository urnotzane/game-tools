use crate::utils::execute_command;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct RemoteData {
    remote_token: String,
    port: String,
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
