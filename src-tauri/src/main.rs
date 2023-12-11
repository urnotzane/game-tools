// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::os::windows;

use tauri::{Builder, Manager};

use teemo::Teemo;

mod cmds;
mod lol;
mod utils;

#[tokio::main]
async fn main() {
    tokio::spawn(async move {
    });
    Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            #[cfg(debug_assertions)]
            window.open_devtools();
            let mut teemo = Teemo::new();
            let handler = window.app_handle();

            tauri::async_runtime::spawn(async move {
                teemo.start().await;
                handler.emit_all("lcu_loaded", true)
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            cmds::greet,
            cmds::get_token,
            cmds::send_lol_req_cmd,
            cmds::get_champs,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
