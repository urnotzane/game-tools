use std::{process::Command, fs, collections::HashMap};
#[cfg(windows)]
use std::os::windows::process::CommandExt;

use serde_json::Value;

#[cfg(unix)]
pub fn execute_command(cmd_str: &str) -> String {
    let output = Command::new(cmd_str)
        .arg("-l")
        .output()
        .expect("failed to execute process");

    let stdout = String::from_utf8(output.stdout).unwrap();
    stdout
}
#[cfg(windows)]
pub fn execute_command(cmd_str: &str) -> String {
    let output = Command::new("cmd")
        // 运行cmd时隐藏窗口
        .creation_flags(0x08000000)
        .args(["/C", cmd_str])
        .output()
        .expect("failed to execute process");

    String::from_utf8_lossy(&output.stdout).to_string()
}

pub fn read_json_file(file_url: &str) -> HashMap<String, Value> {
    let file_contents = fs::read_to_string(file_url).unwrap();
    let mut file_json = HashMap::new();
    let res = serde_json::from_str::<HashMap<String, Value>>(file_contents.as_str());
    match res {
        Ok(json) => {
            file_json = json;
        }
        Err(err) => {
            println!("read_json_file error: {:?}", err);
        }
    }
    file_json
}