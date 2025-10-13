@echo off
echo Building Windows Native Flutter App
echo ====================================

echo.
echo Step 1: Cleaning Flutter project...
flutter clean

echo.
echo Step 2: Getting dependencies...
flutter pub get

echo.
echo Step 3: Building Windows executable...
flutter build windows --release

echo.
echo Step 4: Checking build output...
if exist "build\windows\x64\runner\Release\tip_calculator_flutter.exe" (
    echo SUCCESS: Windows executable built successfully!
    echo Location: build\windows\x64\runner\Release\tip_calculator_flutter.exe
    echo.
    echo You can run the app by double-clicking the executable or running:
    echo start build\windows\x64\runner\Release\tip_calculator_flutter.exe
) else (
    echo ERROR: Build failed or executable not found
    echo Please check the error messages above
)

echo.
echo Build process complete!
pause