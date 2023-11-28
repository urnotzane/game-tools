// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod cmds;
mod lol;
mod utils;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            cmds::greet,
            cmds::get_token,
			cmds::current_summoner,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
