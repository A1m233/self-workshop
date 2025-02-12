while ($true) {
    git push
    if ($LASTEXITCODE -eq 0) {
        Write-Host "push成功！"
        break
    }
    else {
        Write-Host "Push失败，正在重试"
        Start-Sleep -Seconds 5  # 等待 5 秒后重试
    }
}