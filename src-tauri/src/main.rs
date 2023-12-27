// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::{Builder, Manager};

mod cmds;
mod lol;
mod utils;

#[tokio::main]
async fn main() {
    tokio::spawn(async move {
    });
    Builder::default()
        .setup(|app| {
            let window = app.get_window("pet").unwrap();
            #[cfg(debug_assertions)]
            if !window.is_devtools_open() {
                window.open_devtools();
            }
            let _ = window.emit("app_loaded", true);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            cmds::greet,
            cmds::get_token,
            cmds::send_lol_req_cmd,
            cmds::get_champs,
            cmds::initialize_lol,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
