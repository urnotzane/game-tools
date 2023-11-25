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

fn execute_sys_cmd(cmd_str: &str) -> String{
    let output = Command::new(cmd_str)
        .arg("-l")
        .output()
        .expect("failed to execute process");

    let stdout = String::from_utf8(output.stdout).unwrap();
    stdout
}
fn execute_command(cmd_str: &str) -> &str{
    let output = Command::new("cmd")
        .arg("/C")
        .arg(cmd_str)
        .output()
        .expect("failed to execute process");
    
    let stdout = String::from_utf8_lossy(&output.stdout).to_string();
    let col:Vec<_> = stdout.split("\"--").collect();
    let mut token:String = String::new();
    let mut port:String = String::new();
    for item in col {
        let temp:Vec<_> = item.split("=").collect();
        if temp[0] == "remoting-auth-token" {
            token = temp[1].replace("\"", "");
        } else if temp[0] == "app-port" {
            port = temp[1].replace("\"", "");
        }
    }
    println!("token: {}, port: {}", token.to_string(), port.to_string());
    "dsdsd"
}


#[tauri::command]
fn get_token() -> &'static str {
    let res =
    execute_command("wmic PROCESS WHERE name='LeagueClientUx.exe' GET commandline");
    res
}