// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{process::Command, str::Bytes};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, get_token])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn execute_sys_cmd(cmd_str: &str) -> String {
    let output = Command::new(cmd_str)
        .arg("-l")
        .output()
        .expect("failed to execute process");

    let stdout = String::from_utf8(output.stdout).unwrap();
    stdout
}
fn execute_command(cmd_str: &str) -> String {
    let output = Command::new("cmd")
        .arg("/C")
        .arg(cmd_str)
        .output()
        .expect("failed to execute process");

    String::from_utf8_lossy(&output.stdout).to_string()
}

fn get_lol_data_by_key(key: &str) -> String {
    let cmd_res = execute_command("wmic PROCESS WHERE name='LeagueClientUx.exe' GET commandline");
    let col: Vec<_> = cmd_res.split("\"--").collect();
    let mut value: String = String::new();
    for item in col {
        let temp: Vec<_> = item.split("=").collect();
        if temp[0] == key {
            value = temp[1].replace("\"", "");
        }
    }
    value
}

#[tauri::command]
fn get_token() -> String {
    get_lol_data_by_key("remoting-auth-token")
}
