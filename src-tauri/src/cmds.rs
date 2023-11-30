use crate::{
    lol::{self, get_remote_data, RemoteData}, utils::send_lol_req,
};
use reqwest::{self, Method};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
pub async fn get_token() -> RemoteData {
    get_remote_data()
}

#[tauri::command]
pub async fn send_lol_req_cmd(method: &str, url: &str, data: Option<String>) -> Result<String, String> {
  let res_str = send_lol_req(method, url, data).await.unwrap();
  Ok(res_str)
}
// Method::from_bytes(b"GET").unwrap();