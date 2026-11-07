@echo off
echo STARTING > "e:\CODE(C++,C,PY)\bootcam\SahiYatra\bat_output.txt"
cd /d "e:\CODE(C++,C,PY)\bootcam\SahiYatra"
echo PWD_IS_%CD% >> "e:\CODE(C++,C,PY)\bootcam\SahiYatra\bat_output.txt"
npm -v >> "e:\CODE(C++,C,PY)\bootcam\SahiYatra\bat_output.txt" 2>&1
echo DONE >> "e:\CODE(C++,C,PY)\bootcam\SahiYatra\bat_output.txt"
