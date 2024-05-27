// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Builder, Manager};

mod cmds;
mod lol;
mod utils;
mod pet;

#[tokio::main]
async fn main() {
    tokio::spawn(async move {});
    Builder::default()
        .setup(|app| {
            let pet_window = app.get_window("pet").unwrap();
            let window = app.get_window("main").unwrap();

            #[cfg(debug_assertions)]
            {
                if !pet_window.is_devtools_open() {
                    pet_window.open_devtools();
                }
                if !window.is_devtools_open() {
                    window.open_devtools();
                }
            }

            let _ = window.emit("app_loaded", true);
            pet::init_pet_size(pet_window.clone());
            pet::init_pet_pos(pet_window.clone());
            pet::mouse_listener(pet_window.clone());
            pet::get_levels();

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            cmds::greet,
            cmds::get_token,
            cmds::send_lol_req_cmd,
            cmds::get_champs,
            cmds::get_champ,
            cmds::get_spells_summary,
            cmds::initialize_lol,
            pet::get_levels,
            pet::set_level,
            pet::obtain_experience,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}