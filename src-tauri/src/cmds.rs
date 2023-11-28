use crate::lol::{self, get_remote_data, RemoteData};
use reqwest::{self, Response};
use base64::{Engine as _, engine::{self, general_purpose}, alphabet};
use serde::Deserialize;
use serde_json::json;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
pub async fn get_token() -> RemoteData {
    let res = send_req().await.is_ok();
    println!("get_token: {:#?}", res);
    lol::get_remote_data()
}
#[derive(Deserialize)]
pub struct Ip {
    data: String,
}

pub async fn send_req() -> Result<Ip, reqwest::Error> {
    let token = lol::get_remote_data_by_key("remoting-auth-token");
    let client = reqwest::Client::builder()
        // .tls_built_in_root_certs(true)
        .danger_accept_invalid_certs(true)
        .no_proxy()
        .build()
        .unwrap();
    let auth = general_purpose::STANDARD.encode("riot:hdMdEsYv9ocWgo1lw8HvDQ");
    // riot:hdMdEsYv9ocWgo1lw8HvDQ@
    let resp = client
        .get("https://127.0.0.1:58562/lol-summoner/v1/current-summoner")
        .basic_auth("riot", Some(token))
        .header("Authorization", auth)
        .send()
        .await?
        .json::<Ip>()
        .await?
        ;
    println!("text: {:#?}", resp.data);
    Ok(resp)
}
