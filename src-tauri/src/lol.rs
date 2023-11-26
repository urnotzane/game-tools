use crate::utils::execute_command;
use serde::{Serialize, Serializer};

pub struct RemoteData {
    token: String,
    port: String,
}

impl Serialize for RemoteData {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        use serde::ser::SerializeMap;
        let mut map = serializer.serialize_map(Some(2))?;
        map.serialize_entry("token", &self.token)?;
        map.serialize_entry("port", &self.port)?;
        map.end()
    }
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
        token: get_remote_data_by_key("remoting-auth-token"),
        port: get_remote_data_by_key("app-port"),
    }
}
