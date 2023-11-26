use std::process::Command;

pub fn execute_sys_cmd(cmd_str: &str) -> String {
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