use std::process::Command;

use reqwest::Method;

use crate::lol::{RemoteData, get_remote_data};

pub fn _execute_sys_cmd(cmd_str: &str) -> String {
  let output = Command::new(cmd_str)
      .arg("-l")
      .output()
      .expect("failed to execute process");

  let stdout = String::from_utf8(output.stdout).unwrap();
  stdout
}

pub fn execute_command(cmd_str: &str) -> String {
  let output = Command::new("cmd")
      .arg("/C")
      .arg(cmd_str)
      .output()
      .expect("failed to execute process");

  String::from_utf8_lossy(&output.stdout).to_string()
}

pub async fn send_lol_req(method: Method, url: &str) -> Result<String, reqwest::Error> {
  let remote_data: RemoteData = get_remote_data();

  let client = reqwest::Client::builder()
      .danger_accept_invalid_certs(true)
      .no_proxy()
      .build()
      .unwrap();
  let base_url = format!("https://127.0.0.1:{}", remote_data.port);
  let response = client
      .request(method, format!("{}{}", base_url, url))
      .basic_auth("riot", Some(remote_data.remote_token))
      .send()
      .await?
      .text()
      .await?
      ;
  Ok(response)
}