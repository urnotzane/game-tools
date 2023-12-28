
use std::{thread, time::Duration};
use serde::Serialize;
use tauri::Window;
use mouse_position::mouse_position::Mouse;


#[derive(Serialize, Clone)]
struct MouseCoord {
    x:i32,
    y: i32,
}

pub fn mouse_listener(window:Window) {
  tauri::async_runtime::spawn(async move {
      let mut position_coord = MouseCoord {
        x: 0,
        y: 0,
      };
      loop {
          let position = Mouse::get_mouse_position();
          match position {
              Mouse::Position { x, y } => {
                  let x_is_equal = position_coord.x == x;
                  let y_is_equal = position_coord.y == y;
                  // 同一个位置不重复触发事件
                  if x_is_equal && y_is_equal {
                      continue;
                  }
                  position_coord.x = x;
                  position_coord.y = y;
                  let _ = window.emit("mouse_moved", position_coord.clone());
              },
              Mouse::Error => println!("Error getting mouse position"),
          }
          thread::sleep(Duration::from_millis(100));
      }
  });
}