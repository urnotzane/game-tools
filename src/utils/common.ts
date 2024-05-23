import { message } from "ant-design-vue";

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    message.success("复制成功！")
  }).catch((err) => {
    console.error('Error in copying text: ', err);
  });
}