use crate::{lol::{self, get_remote_data, RemoteData}, utils::send_lol_req};
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
pub async fn current_summoner() -> String {
    send_lol_req(Method::GET, "/lol-summoner/v1/current-summoner").await.unwrap()
}

