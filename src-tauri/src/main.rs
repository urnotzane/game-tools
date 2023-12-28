// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::{thread, time::Duration, collections::HashMap};

use tauri::{Builder, Manager, Window};

use mouse_position::mouse_position::Mouse;

mod cmds;
mod lol;
mod utils;

#[tokio::main]
async fn main() {
    tokio::spawn(async move {});
    Builder::default()
        .setup(|app| {
            let window = app.get_window("pet").unwrap();
            #[cfg(debug_assertions)]
            if !window.is_devtools_open() {
                window.open_devtools();
            }
            let _ = window.emit("app_loaded", true);
            mouse_listener(window.clone());
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

fn mouse_listener(window:Window) {
    tauri::async_runtime::spawn(async move {
        let mut position_coord: HashMap<&str, i32> = HashMap::new();
        loop {
            let position = Mouse::get_mouse_position();
            position_coord.insert("x", 0);
            position_coord.insert("y", 0);
            match position {
                Mouse::Position { x, y } => {
                    let x_is_equal = position_coord.get("x") == Some(&x);
                    let y_is_equal = position_coord.get("y") == Some(&y);
                    // 同一个位置不重复触发事件
                    if x_is_equal && y_is_equal {
                        return;
                    }
                    position_coord.insert("x", x);
                    position_coord.insert("y", y);
                    let _ = window.emit("mouse_moved", position_coord.clone());
                },
                Mouse::Error => println!("Error getting mouse position"),
            }
            thread::sleep(Duration::from_millis(100));
        }
    });
}
