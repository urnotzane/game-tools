use serde_json::{Map, Value};
use std::{collections::HashMap, sync::Arc};
use tauri::{Manager, Runtime};
use teemo::Teemo;

use crate::{
    lol::{get_champions, get_remote_data, RemoteData},
    utils::send_lol_req,
};

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
pub async fn send_lol_req_cmd(
    method: &str,
    url: &str,
    data: Option<HashMap<String, Value>>,
) -> Result<String, String> {
    let res_str = send_lol_req(method, url, data).await.unwrap();
    Ok(res_str)
}

#[tauri::command]
pub async fn get_champs() -> Result<Map<String, Value>, String> {
    let res = get_champions().await.unwrap();
    Ok(res)
}

#[tauri::command]
pub async fn initialize_lol<R: Runtime>(
    _app: tauri::AppHandle<R>,
    _window: tauri::Window<R>,
) -> Result<(), String> {
    let events = [
        "Exit",
        "/lol-summoner/v1/current-summoner",
        "/lol-lobby/v2/lobby",
        "/lol-champ-select/v1/session"
    ];
    let mut teemo = Teemo::new();

    tauri::async_runtime::spawn(async move {
        let window = _app.get_window("main").unwrap();
        teemo.start();
    
        let mut lol_app = HashMap::new();
        lol_app.insert("token", teemo.app_token.clone());
        lol_app.insert("port", teemo.app_port.to_string());
        lol_app.insert("url", teemo.url.to_string());
        let _ = window.emit("lcu_loaded", lol_app);
    
        teemo.start_ws().await;
    
        let window2 = window.clone();
        let cb = Arc::new(move |data:HashMap<String, Value>| {
          let _ = window2.emit(data.get("uri").unwrap().as_str().unwrap(), data.clone());
        });

        for event in events {
            teemo.subscribe(event, cb.clone()).await;
        }
        
    });

    Ok(())
}
