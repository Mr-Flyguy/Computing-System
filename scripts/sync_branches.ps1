$branches = @('simple_app','app_with_models_and_algorythms','calculation_app_fetch','API')
foreach ($b in $branches) {
    Write-Host "Processing branch: $b"
    git fetch origin $b
    if (-not (git show-ref --verify --quiet refs/heads/$b)) { git checkout -b $b origin/$b } else { git checkout $b }

    git checkout calculation_app -- data/calculation-types.js components/calculation-type-header/index.js pages/calculation-type/index.js components/calculation-type-details/index.js pages/main/index.js utils/text-and-array-calculations.js

    if ($b -ne 'API' -and $b -ne 'calculation_app_fetch') {
        git rm -rf --ignore-unmatch vite.config.js public
    }

    git add -A
    $changes = git diff --cached --name-only
    if ($changes) {
        git commit -m "Sync: minimal header, sum_unique helper and calculation_types data"
    } else {
        Write-Host "No changes to commit"
    }
    git push -u origin $b
}

git checkout calculation_app
