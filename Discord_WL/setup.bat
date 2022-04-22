@echo off
Title B Y   R A F A 
goto :menu
color d

:menu
color d
echo. __________________________________________________________
echo.                      
echo.                 Developed By Rafa 
echo. __________________________________________________________
echo.   
echo.   Digite  1  e tecle Enter para ligar o Bot.
echo.   Digite  2  e tecle Enter para dar NPM INIT.
echo.   Digite  3  e tecle Enter para fechar esta tela.
echo.

set /p choice=Digite a opcao escolhida:   
if '%choice%'=='1' goto :iniciarbot
if '%choice%'=='2' goto :npminit
if '%choice%'=='3' goto :exit

#####################################################################################################
# Iniciar Bot
:iniciarbot

cls
color d
echo. __________________________________________________________
echo.                      
echo.                 Developed By Rafa 
echo. __________________________________________________________
echo.
color b
echo. ------- CONSOLE LOGS: -------
echo.
echo.

color a

node .
node .
pause .

#####################################################################################################

# NPM INIT
:npminit
color d
echo. __________________________________________________________
echo.                      
echo.                 Developed By Rafa 
echo. __________________________________________________________
echo.

color a

npm init
pause


#####################################################################################################

# sair
:exit
cls
MSG * Fechando a janela.
exit

