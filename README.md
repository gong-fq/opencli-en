# LinguistFlow

基于 OpenCli 思路构建的英语学习助手。

## 功能
- **DeepSeek 驱动**：使用 DeepSeek-V3 模型进行深度语言分析。
- **IPA 标注**：自动识别生词并给出标准的 [RP] 英国音标。
- **语法拆解**：针对复杂长难句提供逻辑层级的分析。

## 部署说明
1. 点击 Netlify 关联此仓库。
2. 在 Site Settings > Environment variables 中添加 `DEEPSEEK_API_KEY`。
3. 直接推送到主分支即可完成部署。