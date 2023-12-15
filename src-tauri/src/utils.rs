#[warn(deprecated)]
use base64::encode;
use http::Request;
use native_tls::TlsConnector;
use reqwest::Method;
use serde_json::Value;
use tokio_tungstenite::{Connector, connect_async_tls_with_config, tungstenite::Message};
use std::{collections::HashMap, os::windows::process::CommandExt, process::Command};
use futures_util::{StreamExt, SinkExt};
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
