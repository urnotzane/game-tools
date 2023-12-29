use mouse_position::mouse_position::Mouse;
use serde::Serialize;
use std::{thread, time::Duration};
use tauri::{LogicalPosition, LogicalSize, Window};

#[derive(Serialize, Clone)]
pub struct MouseCoord {
    x: i32,
    y: i32,
}
/// 监听鼠标位置，执行对应事件
pub fn mouse_listener(window: Window) {
    tauri::async_runtime::spawn(async move {
        let mut position_coord = MouseCoord { x: 0, y: 0 };
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
                    auto_focus(position_coord.clone(), window.clone());
                }
                Mouse::Error => println!("Error getting mouse position"),
            }
            thread::sleep(Duration::from_millis(100));
        }
    });
}

/// 鼠标移动至窗口时自动聚焦
pub fn auto_focus(mouse_pos: MouseCoord, window: Window) {
    let scale_factor = window.scale_factor().unwrap();
    let win_pos = window.inner_position().unwrap().to_logical(scale_factor);
    let win_size = window.inner_size().unwrap().to_logical(scale_factor);

    let win_is_focused = window.is_focused().unwrap();
    let mouse_in_window = coord_in_zone(mouse_pos, win_pos, win_size);
    if mouse_in_window && !win_is_focused {
        let _ = window.set_focus();
    }
}
fn coord_in_zone(
    coord: MouseCoord,
    zone_coord: LogicalPosition<i32>,
    zone_size: LogicalSize<u32>,
) -> bool {
    let zone_x_end = zone_coord.x + zone_size.width as i32;
    let zone_y_end = zone_coord.y + zone_size.height as i32;

    let in_zone_x = coord.x > zone_coord.x && coord.x < zone_x_end;
    let in_zone_y = coord.y > zone_coord.y && coord.y < zone_y_end;

    in_zone_x && in_zone_y
}
#[test]
fn it_works() {
    let in_zone = coord_in_zone(
        MouseCoord { x: 30, y: 40 },
        LogicalPosition { x: 0, y: 0 },
        LogicalSize {
            width: 320,
            height: 420,
        },
    );
    let out_zone = coord_in_zone(
        MouseCoord { x: 330, y: 430 },
        LogicalPosition { x: 0, y: 0 },
        LogicalSize {
            width: 320,
            height: 420,
        },
    );
    let out_y = coord_in_zone(
        MouseCoord { x: 30, y: 430 },
        LogicalPosition { x: 0, y: 0 },
        LogicalSize {
            width: 320,
            height: 420,
        },
    );
    assert_eq!(in_zone, true);
    assert_eq!(out_zone, false);
    assert_eq!(out_y, false);
}
