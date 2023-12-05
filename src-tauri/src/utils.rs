use reqwest::Method;
use serde_json::Value;
use std::{collections::HashMap, os::windows::process::CommandExt, process::Command};

use crate::lol::{get_remote_data, RemoteData};
#[cfg(unix)]
pub fn execute_sys_cmd(cmd_str: &str) -> String {
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

pub async fn send_lol_req(
    method: &str,
    url: &str,
    data: Option<HashMap<String, Value>>,
) -> Result<String, reqwest::Error> {
    let remote_data: RemoteData = get_remote_data();
    let method_byte = method.as_bytes();
    let base_url = format!("https://127.0.0.1:{}", remote_data.port);

    let client: reqwest::Client = reqwest::Client::builder()
        .danger_accept_invalid_certs(true)
        .no_proxy()
        .build()
        .unwrap();

    let response = client
        .request(
            Method::from_bytes(method_byte).unwrap(),
            format!("{}{}", base_url, url),
        )
        .basic_auth("riot", Some(remote_data.remote_token))
        .json(&data)
        .send()
        .await?
        .text()
        .await?;
    Ok(response)
}
