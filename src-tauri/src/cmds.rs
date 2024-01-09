use serde_json::{Map, Value};
use std::{collections::HashMap, sync::Arc};
use tauri::Runtime;
use teemo::Teemo;

use crate::lol::{get_champions, get_remote_data, RemoteData, get_champion, spells_summary};

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
) -> Result<HashMap<String, Value>, String> {
    let mut teemo = Teemo::new();
    teemo.start();

    let res_data = teemo.request(method, url, data).await;
    Ok(res_data)
}

#[tauri::command]
pub async fn get_champs() -> Result<Map<String, Value>, String> {
    let res = get_champions().await.unwrap();
    Ok(res)
}
#[tauri::command]
pub async fn get_champ(id: &str) -> Result<Map<String, Value>, String> {
    let res = get_champion(id).await.unwrap();
    Ok(res)
}
#[tauri::command]
pub async fn get_spells_summary(id: &str) -> Result<HashMap<String, Value>, String> {
    let res = spells_summary(id).await;
    Ok(res)
}

#[tauri::command]
pub async fn initialize_lol<R: Runtime>(
    _app: tauri::AppHandle<R>,
    window: tauri::Window<R>,
) -> Result<(), String> {
    let events = [
        "/lol-summoner/v1/current-summoner",
        "/lol-lobby/v2/lobby",
        "/lol-champ-select/v1/session"
    ];
    let mut teemo = Teemo::new();

    tauri::async_runtime::spawn(async move {
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
