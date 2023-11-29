// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Builder;

mod cmds;
mod lol;
mod utils;

fn main() {
	Builder::default()
		.invoke_handler(tauri::generate_handler![
			cmds::greet,
			cmds::get_token,
			cmds::current_summoner,
			cmds::champ_select_session,
		])
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}
