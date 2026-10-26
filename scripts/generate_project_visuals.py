import os

svg_defs = '''
<defs>
  <linearGradient id='bgGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
    <stop offset='0%' stop-color='#200711' />
    <stop offset='50%' stop-color='#340D1C' />
    <stop offset='100%' stop-color='#15040B' />
  </linearGradient>
  <linearGradient id='wineGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
    <stop offset='0%' stop-color='#641F36' />
    <stop offset='100%' stop-color='#451425' />
  </linearGradient>
  <pattern id='grid' width='30' height='30' patternUnits='userSpaceOnUse'>
    <path d='M 30 0 L 0 0 0 30' fill='none' stroke='#DFB9BF' stroke-width='0.5' stroke-opacity='0.12'/>
  </pattern>
</defs>
'''

files = {}

# 1. first-responder-cover.svg
files['first-responder-cover.svg'] = f'''<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800' width='1200' height='800'>
{svg_defs}
  <rect width='100%' height='100%' fill='url(#bgGrad)'/>
  <rect width='100%' height='100%' fill='url(#grid)'/>
  <rect x='40' y='35' width='1120' height='55' rx='8' fill='#451425' fill-opacity='0.85' stroke='#C28B9A' stroke-width='1.5'/>
  <circle cx='70' cy='62' r='8' fill='#10B981'/>
  <text x='95' y='68' fill='#F7F0E7' font-family='sans-serif' font-weight='bold' font-size='20' letter-spacing='2'>AUTONOMOUS FIRST-RESPONDER // JETSON ORIN NANO + NAV2</text>
  <text x='960' y='68' fill='#C28B9A' font-family='monospace' font-size='16'>FPS: 38.4 | ROS2 HUMBLE</text>

  <g transform='translate(60, 120)'>
    <rect width='580' height='480' rx='12' fill='#120409' stroke='#641F36' stroke-width='2'/>
    <circle cx='290' cy='240' r='80' fill='none' stroke='#DFB9BF' stroke-opacity='0.2' stroke-dasharray='4 4'/>
    <circle cx='290' cy='240' r='160' fill='none' stroke='#DFB9BF' stroke-opacity='0.2' stroke-dasharray='4 4'/>
    <circle cx='290' cy='240' r='220' fill='none' stroke='#DFB9BF' stroke-opacity='0.15'/>
    <path d='M 90 410 Q 180 320 230 270 T 360 170 T 500 110' fill='none' stroke='#38BDF8' stroke-width='4' stroke-linecap='round'/>
    <path d='M 90 410 Q 180 320 230 270 T 360 170 T 500 110' fill='none' stroke='#38BDF8' stroke-opacity='0.35' stroke-width='14'/>
    <circle cx='90' cy='410' r='8' fill='#10B981' stroke='#F7F0E7' stroke-width='2'/>
    <circle cx='230' cy='270' r='6' fill='#F59E0B' stroke='#F7F0E7' stroke-width='1.5'/>
    <circle cx='360' cy='170' r='6' fill='#F59E0B' stroke='#F7F0E7' stroke-width='1.5'/>
    <circle cx='500' cy='110' r='12' fill='#EF4444' stroke='#F7F0E7' stroke-width='3'/>
    <text x='518' y='116' fill='#F7F0E7' font-family='sans-serif' font-weight='bold' font-size='14'>TARGET [EMERGENCY DISPATCH]</text>
    <g transform='translate(230, 270) rotate(-45)'>
      <polygon points='0,-16 12,14 -12,14' fill='#DFB9BF' stroke='#641F36' stroke-width='2'/>
    </g>
    <text x='25' y='40' fill='#F7F0E7' font-family='monospace' font-size='16' font-weight='bold'>GLOBAL NAV2 COSTMAP // LIVE PLANNER</text>
    <text x='25' y='65' fill='#C28B9A' font-family='monospace' font-size='13'>COORDINATES: X: 142.8m  Y: 88.4m  THETA: 42.1 DEG</text>
  </g>

  <g transform='translate(670, 120)'>
    <rect width='470' height='260' rx='12' fill='#120409' stroke='#641F36' stroke-width='2'/>
    <polygon points='235,50 30,230 440,230' fill='#641F36' fill-opacity='0.4' stroke='#10B981' stroke-width='2'/>
    <polygon points='235,50 150,230 320,230' fill='#10B981' fill-opacity='0.25'/>
    <rect x='280' y='110' width='70' height='90' fill='none' stroke='#EF4444' stroke-width='2' stroke-dasharray='4 2'/>
    <rect x='280' y='92' width='70' height='18' fill='#EF4444'/>
    <text x='284' y='105' fill='#F7F0E7' font-family='sans-serif' font-size='10' font-weight='bold'>OBSTACLE 94%</text>
    <text x='20' y='32' fill='#F7F0E7' font-family='monospace' font-size='14' font-weight='bold'>CAMERA FEED // YOLOv8 ROAD SEGMENTATION</text>
  </g>

  <g transform='translate(670, 400)'>
    <rect width='470' height='200' rx='12' fill='#120409' stroke='#641F36' stroke-width='2'/>
    <text x='20' y='32' fill='#F7F0E7' font-family='monospace' font-size='14' font-weight='bold'>DRIVE-BY-WIRE CAN TELEMETRY</text>
    <text x='30' y='75' fill='#C28B9A' font-family='monospace' font-size='13'>STEERING ANGLE</text>
    <rect x='30' y='85' width='180' height='12' rx='6' fill='#380F1F'/>
    <rect x='30' y='85' width='120' height='12' rx='6' fill='#10B981'/>
    <text x='220' y='96' fill='#F7F0E7' font-family='monospace' font-size='13'>+14.2 DEG [CAN 0x120]</text>
    <text x='30' y='130' fill='#C28B9A' font-family='monospace' font-size='13'>THROTTLE ACTUATOR</text>
    <rect x='30' y='140' width='180' height='12' rx='6' fill='#380F1F'/>
    <rect x='30' y='140' width='95' height='12' rx='6' fill='#38BDF8'/>
    <text x='220' y='151' fill='#F7F0E7' font-family='monospace' font-size='13'>52% PWM [CAN 0x124]</text>
    <text x='30' y='180' fill='#10B981' font-family='monospace' font-size='13'>[OK] MQTT REVERSE DISPATCH BRIDGE: CONNECTED</text>
  </g>

  <rect x='40' y='630' width='1120' height='120' rx='10' fill='#380F1F' stroke='#641F36' stroke-width='1.5'/>
  <text x='65' y='665' fill='#DFB9BF' font-family='serif' font-size='20' font-weight='bold'>Autonomous First-Responder Buggy Retrofit</text>
  <text x='65' y='695' fill='#F7F0E7' font-family='sans-serif' font-size='14'>Platform: Electric aBAJA Buggy Chassis · Edge: NVIDIA Jetson Orin Nano · Middleware: ROS 2 Humble &amp; Nav2</text>
  <text x='65' y='722' fill='#C28B9A' font-family='monospace' font-size='13'>Perception: Smartphone Camera + YOLOv8/PIDNet-S · Actuation: Drive-by-Wire Electronic Steering &amp; Throttle CAN</text>
</svg>'''

# 2. baja-suspension-kinematics.svg
files['baja-suspension-kinematics.svg'] = f'''<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800' width='1200' height='800'>
{svg_defs}
  <rect width='100%' height='100%' fill='url(#bgGrad)'/>
  <rect width='100%' height='100%' fill='url(#grid)'/>
  
  <rect x='40' y='35' width='1120' height='55' rx='8' fill='#451425' stroke='#C28B9A' stroke-width='1.5'/>
  <text x='65' y='68' fill='#F7F0E7' font-family='sans-serif' font-weight='bold' font-size='20' letter-spacing='2'>EQUINOX aBAJA 2026 // SUSPENSION &amp; STEERING KINEMATICS</text>
  <text x='940' y='68' fill='#C28B9A' font-family='monospace' font-size='16'>LOTUS SHARK + SOLIDWORKS</text>

  <g transform='translate(60, 120)'>
    <rect width='620' height='480' rx='12' fill='#120409' stroke='#641F36' stroke-width='2'/>
    <text x='30' y='40' fill='#F7F0E7' font-family='monospace' font-size='16' font-weight='bold'>DOUBLE WISHBONE FRONT KINEMATICS</text>
    <text x='30' y='65' fill='#C28B9A' font-family='monospace' font-size='13'>ROLL-CENTRE MIGRATION &amp; BUMP-STEER OPTIMIZATION</text>

    <rect x='100' y='140' width='16' height='260' rx='4' fill='#451425' stroke='#C28B9A'/>
    <circle cx='108' cy='180' r='6' fill='#DFB9BF' stroke='#641F36' stroke-width='2'/>
    <circle cx='108' cy='360' r='6' fill='#DFB9BF' stroke='#641F36' stroke-width='2'/>
    <text x='40' y='185' fill='#C28B9A' font-family='monospace' font-size='12'>UPPER A</text>
    <text x='40' y='365' fill='#C28B9A' font-family='monospace' font-size='12'>LOWER A</text>

    <rect x='460' y='190' width='24' height='160' rx='4' fill='#641F36' stroke='#DFB9BF' stroke-width='1.5'/>
    <circle cx='472' cy='210' r='6' fill='#DFB9BF' stroke='#641F36' stroke-width='2'/>
    <circle cx='472' cy='330' r='6' fill='#DFB9BF' stroke='#641F36' stroke-width='2'/>
    
    <line x1='108' y1='180' x2='472' y2='210' stroke='#38BDF8' stroke-width='5' stroke-linecap='round'/>
    <line x1='108' y1='360' x2='472' y2='330' stroke='#38BDF8' stroke-width='6' stroke-linecap='round'/>

    <line x1='120' y1='275' x2='465' y2='270' stroke='#F59E0B' stroke-width='3.5' stroke-dasharray='8 4' stroke-linecap='round'/>
    <text x='250' y='265' fill='#F59E0B' font-family='monospace' font-size='12'>PARALLEL TIE-ROD (0.35 DEG BUMP-STEER)</text>

    <rect x='495' y='140' width='60' height='260' rx='12' fill='#2A1720' stroke='#DFB9BF' stroke-width='2'/>
    <ellipse cx='525' cy='270' rx='12' ry='40' fill='#451425' stroke='#DFB9BF'/>
    <circle cx='525' cy='270' r='8' fill='#10B981'/>

    <circle cx='290' cy='430' r='7' fill='#EF4444'/>
    <text x='305' y='435' fill='#EF4444' font-family='monospace' font-size='13' font-weight='bold'>ROLL CENTRE (RC = +48mm)</text>
  </g>

  <g transform='translate(710, 120)'>
    <rect width='430' height='480' rx='12' fill='#120409' stroke='#641F36' stroke-width='2'/>
    <text x='25' y='40' fill='#F7F0E7' font-family='monospace' font-size='16' font-weight='bold'>ACKERMANN STEERING PRINCIPLES</text>
    <text x='25' y='65' fill='#C28B9A' font-family='monospace' font-size='13'>SOLIDWORKS &amp; LOTUS CORRELATION</text>

    <line x1='50' y1='100' x2='50' y2='380' stroke='#DFB9BF' stroke-width='1.5'/>
    <line x1='50' y1='380' x2='390' y2='380' stroke='#DFB9BF' stroke-width='1.5'/>
    <text x='20' y='95' fill='#C28B9A' font-family='monospace' font-size='11'>INNER WHEEL (DEG)</text>
    <text x='240' y='410' fill='#C28B9A' font-family='monospace' font-size='11'>HANDWHEEL ANGLE (DEG)</text>

    <path d='M 50 380 Q 200 320 380 140' fill='none' stroke='#DFB9BF' stroke-opacity='0.4' stroke-width='2' stroke-dasharray='4 4'/>
    <path d='M 50 380 Q 210 300 380 120' fill='none' stroke='#10B981' stroke-width='3.5'/>
    <path d='M 50 380 L 380 180' fill='none' stroke='#EF4444' stroke-width='2' stroke-dasharray='6 3'/>

    <text x='80' y='130' fill='#10B981' font-family='monospace' font-size='13'>- 88% ACKERMANN (OPTIMIZED)</text>
    <text x='80' y='155' fill='#DFB9BF' font-family='monospace' font-size='12'>-- 100% THEORETICAL</text>
    <text x='80' y='180' fill='#EF4444' font-family='monospace' font-size='12'>.. PARALLEL (EXCESS SCRUB)</text>

    <rect x='25' y='425' width='380' height='40' rx='6' fill='#380F1F'/>
    <text x='35' y='450' fill='#DFB9BF' font-family='monospace' font-size='12'>RESULT: TYRE SCRUB REDUCED BY 34%</text>
  </g>

  <rect x='40' y='630' width='1120' height='120' rx='10' fill='#380F1F' stroke='#641F36' stroke-width='1.5'/>
  <text x='65' y='665' fill='#DFB9BF' font-family='serif' font-size='20' font-weight='bold'>Team Equinox aBAJA SAE 2026 Vehicle Dynamics</text>
  <text x='65' y='695' fill='#F7F0E7' font-family='sans-serif' font-size='14'>Designed by Vasudev Saras K M: Steering &amp; Suspension Subsystem Engineering</text>
  <text x='65' y='722' fill='#C28B9A' font-family='monospace' font-size='13'>Kinematics: Lotus SHARK · 3D Parametric CAD: Dassault Systèmes SOLIDWORKS · Multibody Dynamics: MSC Adams Car</text>
</svg>'''

# 3. silent-guardian-cover.svg
files['silent-guardian-cover.svg'] = f'''<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800' width='1200' height='800'>
{svg_defs}
  <rect width='100%' height='100%' fill='url(#bgGrad)'/>
  <rect width='100%' height='100%' fill='url(#grid)'/>

  <rect x='40' y='35' width='1120' height='55' rx='8' fill='#451425' stroke='#EF4444' stroke-width='1.5'/>
  <text x='65' y='68' fill='#F7F0E7' font-family='sans-serif' font-weight='bold' font-size='20' letter-spacing='2'>SILENT GUARDIAN // IN-BROWSER ACOUSTIC CALL-SCAM FIREWALL</text>
  <text x='960' y='68' fill='#EF4444' font-family='monospace' font-size='16'>HACK@COOEE 24H SPRINT</text>

  <g transform='translate(60, 115)'>
    <rect width='1080' height='75' rx='10' fill='#EF4444' fill-opacity='0.15' stroke='#EF4444' stroke-width='2'/>
    <circle cx='45' cy='37' r='18' fill='#EF4444'/>
    <text x='38' y='44' fill='#F7F0E7' font-family='sans-serif' font-weight='bold' font-size='22'>!</text>
    <text x='80' y='38' fill='#EF4444' font-family='sans-serif' font-weight='bold' font-size='18' letter-spacing='1'>FRAUD THREAT DETECTED -- CALL AUDIO SILENCED &amp; INTERCEPTED</text>
    <text x='80' y='58' fill='#DFB9BF' font-family='monospace' font-size='13'>Zero Audio Transmitted to Cloud · In-Browser Vosk Engine · Sensitive Number Redacted</text>
  </g>

  <g transform='translate(60, 215)'>
    <rect width='680' height='385' rx='12' fill='#120409' stroke='#641F36' stroke-width='2'/>
    <text x='25' y='35' fill='#F7F0E7' font-family='monospace' font-size='15' font-weight='bold'>LIVE CALL AUDIO TRANSCRIPT // REDACTED STREAM</text>

    <path d='M 30 90 Q 60 40 90 90 T 150 90 T 210 20 T 270 90 T 330 140 T 390 90 T 450 30 T 510 90 T 570 120 T 630 90' fill='none' stroke='#EF4444' stroke-width='2.5'/>

    <rect x='25' y='130' width='630' height='230' rx='8' fill='#240713' stroke='#451425'/>
    <text x='45' y='165' fill='#C28B9A' font-family='monospace' font-size='14'>CALLER [URGENT]: &quot;Your bank account has been compromised.&quot;</text>
    <text x='45' y='195' fill='#C28B9A' font-family='monospace' font-size='14'>CALLER [PRESSURE]: &quot;Share the one-time password immediately!&quot;</text>
    <rect x='45' y='215' width='590' height='38' rx='6' fill='#EF4444' fill-opacity='0.25' stroke='#EF4444'/>
    <text x='55' y='239' fill='#F7F0E7' font-family='monospace' font-size='13' font-weight='bold'>[REDACTED OTP: ******] -- AUTOMATIC NUMBER FILTER TRIGGERED</text>
    <text x='45' y='285' fill='#10B981' font-family='monospace' font-size='13'>[OK] Sensitive PIN/OTP/Card numbers withheld from audio logs</text>
    <text x='45' y='315' fill='#DFB9BF' font-family='monospace' font-size='13'>[OK] Local Forensic Packager: silent_evidence_call_849.json exported</text>
  </g>

  <g transform='translate(770, 215)'>
    <rect width='370' height='385' rx='12' fill='#120409' stroke='#641F36' stroke-width='2'/>
    <text x='25' y='35' fill='#F7F0E7' font-family='monospace' font-size='15' font-weight='bold'>DUAL THREAT ENGINES</text>

    <circle cx='185' cy='135' r='65' fill='none' stroke='#380F1F' stroke-width='14'/>
    <circle cx='185' cy='135' r='65' fill='none' stroke='#EF4444' stroke-width='14' stroke-dasharray='380 410' stroke-linecap='round'/>
    <text x='155' y='135' fill='#EF4444' font-family='sans-serif' font-weight='bold' font-size='32'>94</text>
    <text x='150' y='160' fill='#DFB9BF' font-family='monospace' font-size='12'>THREAT SCORE</text>

    <text x='30' y='240' fill='#C28B9A' font-family='monospace' font-size='12'>URGENCY / COERCION:</text>
    <rect x='30' y='250' width='310' height='10' rx='5' fill='#380F1F'/>
    <rect x='30' y='250' width='285' height='10' rx='5' fill='#EF4444'/>

    <text x='30' y='295' fill='#C28B9A' font-family='monospace' font-size='12'>FINANCIAL DEMAND PATTERN:</text>
    <rect x='30' y='305' width='310' height='10' rx='5' fill='#380F1F'/>
    <rect x='30' y='305' width='260' height='10' rx='5' fill='#EF4444'/>

    <text x='30' y='350' fill='#10B981' font-family='monospace' font-size='12'>BENIGN PRIVACY: ZERO LOGGING FOR BENIGN</text>
  </g>

  <rect x='40' y='630' width='1120' height='120' rx='10' fill='#380F1F' stroke='#641F36' stroke-width='1.5'/>
  <text x='65' y='665' fill='#DFB9BF' font-family='serif' font-size='20' font-weight='bold'>Silent Guardian: Local-First Speech Defense</text>
  <text x='65' y='695' fill='#F7F0E7' font-family='sans-serif' font-size='14'>Developed at Hack@Cooee 24-Hour Hackathon by Vasudev Saras</text>
  <text x='65' y='722' fill='#C28B9A' font-family='monospace' font-size='13'>Stack: Web Speech API &amp; Vosk In-Browser Speech Recognition · Express/Node.js Heuristic Engines · Forensic JSON Generator</text>
</svg>'''

# 4. mediarm-schematic.svg
files['mediarm-schematic.svg'] = f'''<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800' width='1200' height='800'>
{svg_defs}
  <rect width='100%' height='100%' fill='url(#bgGrad)'/>
  <rect width='100%' height='100%' fill='url(#grid)'/>

  <rect x='40' y='35' width='1120' height='55' rx='8' fill='#451425' stroke='#C28B9A' stroke-width='1.5'/>
  <text x='65' y='68' fill='#F7F0E7' font-family='sans-serif' font-weight='bold' font-size='20' letter-spacing='2'>MEDIARM // 3-DOF ROBOTIC MANIPULATOR (S6 MINI PROJECT)</text>
  <text x='960' y='68' fill='#C28B9A' font-family='monospace' font-size='16'>ESP32 + IBT-2 + FLASK</text>

  <g transform='translate(60, 120)'>
    <rect width='620' height='480' rx='12' fill='#120409' stroke='#641F36' stroke-width='2'/>
    <text x='30' y='40' fill='#F7F0E7' font-family='monospace' font-size='16' font-weight='bold'>KINEMATIC LINKAGE &amp; JOINT SPECS</text>

    <rect x='120' y='420' width='140' height='25' rx='4' fill='#451425' stroke='#C28B9A' stroke-width='2'/>
    <circle cx='190' cy='420' r='12' fill='#641F36' stroke='#DFB9BF' stroke-width='2'/>
    <text x='155' y='465' fill='#C28B9A' font-family='monospace' font-size='12'>JOINT 1: BASE PAN</text>

    <line x1='190' y1='420' x2='260' y2='250' stroke='#38BDF8' stroke-width='10' stroke-linecap='round'/>
    <circle cx='260' cy='250' r='14' fill='#DFB9BF' stroke='#641F36' stroke-width='3'/>
    <text x='200' y='235' fill='#DFB9BF' font-family='monospace' font-size='12'>THETA 1 (SHOULDER)</text>

    <line x1='260' y1='250' x2='430' y2='170' stroke='#10B981' stroke-width='8' stroke-linecap='round'/>
    <circle cx='430' cy='170' r='12' fill='#DFB9BF' stroke='#641F36' stroke-width='3'/>
    <text x='400' y='145' fill='#DFB9BF' font-family='monospace' font-size='12'>THETA 2 (ELBOW)</text>

    <line x1='430' y1='170' x2='510' y2='210' stroke='#F59E0B' stroke-width='6' stroke-linecap='round'/>
    <circle cx='510' cy='210' r='8' fill='#DFB9BF' stroke='#641F36' stroke-width='2'/>
    
    <path d='M 510 210 L 545 190 M 510 210 L 545 230' stroke='#DFB9BF' stroke-width='4' stroke-linecap='round'/>
    <circle cx='555' cy='210' r='12' fill='#EF4444' stroke='#F7F0E7' stroke-width='2'/>
    <text x='510' y='255' fill='#EF4444' font-family='monospace' font-size='11'>PAYLOAD (MEDICINE)</text>
  </g>

  <g transform='translate(710, 120)'>
    <rect width='430' height='480' rx='12' fill='#120409' stroke='#641F36' stroke-width='2'/>
    <text x='25' y='40' fill='#F7F0E7' font-family='monospace' font-size='16' font-weight='bold'>FLASK CONTROL &amp; FIRMWARE</text>

    <rect x='25' y='65' width='380' height='160' rx='8' fill='#240713' stroke='#451425'/>
    <text x='40' y='95' fill='#DFB9BF' font-family='monospace' font-size='13' font-weight='bold'>CONTROLLER: ESP32 Dual-Core 240MHz</text>
    <text x='40' y='125' fill='#C28B9A' font-family='monospace' font-size='13'>DRIVERS: IBT-2 (BTS7960 43A H-Bridge)</text>
    <text x='40' y='155' fill='#C28B9A' font-family='monospace' font-size='13'>SERVOS: MG996R Metal Gear + SG90</text>
    <text x='40' y='185' fill='#10B981' font-family='monospace' font-size='13'>VOICE: Vosk Offline Speech Engine</text>
    <text x='40' y='210' fill='#EF4444' font-family='monospace' font-size='13'>SAFETY: Hardware E-Stop Kill Switch</text>

    <text x='25' y='260' fill='#F7F0E7' font-family='monospace' font-size='14' font-weight='bold'>WEB DASHBOARD CONTROLS</text>
    
    <text x='30' y='295' fill='#C28B9A' font-family='monospace' font-size='12'>BASE ANGLE (0 - 180 DEG): 90 DEG</text>
    <rect x='30' y='305' width='360' height='8' rx='4' fill='#380F1F'/>
    <rect x='30' y='305' width='180' height='8' rx='4' fill='#10B981'/>

    <text x='30' y='345' fill='#C28B9A' font-family='monospace' font-size='12'>SHOULDER (0 - 180 DEG): 120 DEG</text>
    <rect x='30' y='355' width='360' height='8' rx='4' fill='#380F1F'/>
    <rect x='30' y='355' width='240' height='8' rx='4' fill='#38BDF8'/>

    <text x='30' y='395' fill='#C28B9A' font-family='monospace' font-size='12'>ELBOW (0 - 180 DEG): 45 DEG</text>
    <rect x='30' y='405' width='360' height='8' rx='4' fill='#380F1F'/>
    <rect x='30' y='405' width='90' height='8' rx='4' fill='#F59E0B'/>

    <rect x='25' y='435' width='380' height='32' rx='6' fill='#EF4444'/>
    <text x='115' y='456' fill='#F7F0E7' font-family='sans-serif' font-weight='bold' font-size='13'>EMERGENCY KILL SWITCH</text>
  </g>

  <rect x='40' y='630' width='1120' height='120' rx='10' fill='#380F1F' stroke='#641F36' stroke-width='1.5'/>
  <text x='65' y='665' fill='#DFB9BF' font-family='serif' font-size='20' font-weight='bold'>MediArm: 3-DOF Semi-Autonomous Positioning Prototype</text>
  <text x='65' y='695' fill='#F7F0E7' font-family='sans-serif' font-size='14'>Designed, Fabricated, and Programmed by Vasudev Saras K M</text>
  <text x='65' y='722' fill='#C28B9A' font-family='monospace' font-size='13'>ESP32 Firmware · High-Current IBT-2 Actuation · Python/Flask Web Interface · Vosk Offline Voice Actuation</text>
</svg>'''

# 5. vybe-discovery-ui.svg
files['vybe-discovery-ui.svg'] = f'''<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800' width='1200' height='800'>
{svg_defs}
  <rect width='100%' height='100%' fill='url(#bgGrad)'/>
  <rect width='100%' height='100%' fill='url(#grid)'/>

  <rect x='40' y='35' width='1120' height='55' rx='8' fill='#451425' stroke='#C28B9A' stroke-width='1.5'/>
  <text x='65' y='68' fill='#F7F0E7' font-family='sans-serif' font-weight='bold' font-size='20' letter-spacing='2'>VYBE // SWIPE-BASED TRAVEL PACKAGE DISCOVERY</text>
  <text x='960' y='68' fill='#C28B9A' font-family='monospace' font-size='16'>TINKERHUB 15.5H SPRINT</text>

  <g transform='translate(420, 115)'>
    <rect width='360' height='500' rx='32' fill='#15060C' stroke='#641F36' stroke-width='3'/>
    <rect x='130' y='12' width='100' height='6' rx='3' fill='#451425'/>

    <rect x='35' y='60' width='290' height='360' rx='16' fill='#380F1F' stroke='#451425' transform='rotate(-4 180 240)' opacity='0.7'/>
    
    <rect x='35' y='55' width='290' height='370' rx='16' fill='#240713' stroke='#C28B9A' stroke-width='1.5'/>
    
    <rect x='50' y='75' width='260' height='160' rx='10' fill='#451425'/>
    <path d='M 50 200 Q 110 160 170 190 T 310 160 L 310 235 L 50 235 Z' fill='#641F36'/>
    <circle cx='250' cy='120' r='20' fill='#F59E0B' opacity='0.8'/>
    <text x='65' y='225' fill='#F7F0E7' font-family='sans-serif' font-weight='bold' font-size='15'>Munnar Cloud Trek &amp; Camp</text>

    <text x='55' y='270' fill='#DFB9BF' font-family='sans-serif' font-size='13'>2 Nights · Guided Trail · Campfire</text>
    <text x='55' y='295' fill='#C28B9A' font-family='monospace' font-size='12'>OPERATOR: High-Range Expeditions</text>
    <text x='55' y='325' fill='#10B981' font-family='sans-serif' font-weight='bold' font-size='18'>INR 3,499 / person</text>

    <circle cx='100' cy='465' r='26' fill='#EF4444' stroke='#F7F0E7' stroke-width='1.5'/>
    <text x='92' y='472' fill='#F7F0E7' font-family='sans-serif' font-weight='bold' font-size='22'>X</text>

    <circle cx='260' cy='465' r='26' fill='#10B981' stroke='#F7F0E7' stroke-width='1.5'/>
    <text x='250' y='472' fill='#F7F0E7' font-family='sans-serif' font-weight='bold' font-size='20'>OK</text>
  </g>

  <g transform='translate(60, 140)'>
    <rect width='320' height='440' rx='12' fill='#120409' stroke='#641F36' stroke-width='2'/>
    <text x='25' y='40' fill='#F7F0E7' font-family='monospace' font-size='16' font-weight='bold'>MULTI-ROLE ARCHITECTURE</text>
    <text x='25' y='65' fill='#C28B9A' font-family='monospace' font-size='13'>FLASK SESSION WORKFLOW</text>

    <rect x='20' y='95' width='280' height='85' rx='8' fill='#240713' stroke='#451425'/>
    <text x='35' y='125' fill='#DFB9BF' font-family='sans-serif' font-weight='bold' font-size='14'>1. TRAVELLER PORTAL</text>
    <text x='35' y='150' fill='#C28B9A' font-family='sans-serif' font-size='12'>Swipe discovery, itinerary saved, direct operator booking request.</text>

    <rect x='20' y='200' width='280' height='85' rx='8' fill='#240713' stroke='#451425'/>
    <text x='35' y='230' fill='#38BDF8' font-family='sans-serif' font-weight='bold' font-size='14'>2. OPERATOR PORTAL</text>
    <text x='35' y='255' fill='#C28B9A' font-family='sans-serif' font-size='12'>Publish tour packages, set seasonal dates, track lead conversions.</text>

    <rect x='20' y='305' width='280' height='85' rx='8' fill='#240713' stroke='#451425'/>
    <text x='35' y='335' fill='#F59E0B' font-family='sans-serif' font-weight='bold' font-size='14'>3. ADMIN CONSOLE</text>
    <text x='35' y='360' fill='#C28B9A' font-family='sans-serif' font-size='12'>Moderation queue, operator verification, platform analytics.</text>
  </g>

  <g transform='translate(820, 140)'>
    <rect width='320' height='440' rx='12' fill='#120409' stroke='#641F36' stroke-width='2'/>
    <text x='25' y='40' fill='#F7F0E7' font-family='monospace' font-size='16' font-weight='bold'>HACKATHON SPRINT STATS</text>
    <text x='25' y='65' fill='#C28B9A' font-family='monospace' font-size='13'>TINKERHUB CALICUT</text>

    <rect x='20' y='95' width='280' height='70' rx='8' fill='#240713'/>
    <text x='35' y='125' fill='#F7F0E7' font-family='sans-serif' font-weight='bold' font-size='22'>15.5 HOURS</text>
    <text x='35' y='145' fill='#C28B9A' font-family='monospace' font-size='12'>Rapid MVP Conception to Demo</text>

    <rect x='20' y='180' width='280' height='70' rx='8' fill='#240713'/>
    <text x='35' y='210' fill='#F7F0E7' font-family='sans-serif' font-weight='bold' font-size='22'>2 MEMBERS</text>
    <text x='35' y='230' fill='#C28B9A' font-family='monospace' font-size='12'>Agile Full-Stack Collaboration</text>

    <rect x='20' y='265' width='280' height='140' rx='8' fill='#240713'/>
    <text x='35' y='295' fill='#10B981' font-family='monospace' font-size='13' font-weight='bold'>TECH HIGHLIGHTS</text>
    <text x='35' y='325' fill='#DFB9BF' font-family='sans-serif' font-size='12'>- Python/Flask backend routing</text>
    <text x='35' y='350' fill='#DFB9BF' font-family='sans-serif' font-size='12'>- Touch/Mouse card gesture physics</text>
    <text x='35' y='375' fill='#DFB9BF' font-family='sans-serif' font-size='12'>- Lightweight responsive CSS grid</text>
  </g>

  <rect x='40' y='630' width='1120' height='120' rx='10' fill='#380F1F' stroke='#641F36' stroke-width='1.5'/>
  <text x='65' y='665' fill='#DFB9BF' font-family='serif' font-size='20' font-weight='bold'>VYBE: Travel Discovery Web App</text>
  <text x='65' y='695' fill='#F7F0E7' font-family='sans-serif' font-size='14'>Developed at TinkerHub Calicut Travel Hackathon by Vasudev Saras &amp; Teammate</text>
  <text x='65' y='722' fill='#C28B9A' font-family='monospace' font-size='13'>Stack: Python, Flask, HTML5, CSS3, JavaScript · 15.5-Hour Rapid Sprint MVP</text>
</svg>'''

# 6. veda-terminal-hud.svg
files['veda-terminal-hud.svg'] = f'''<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800' width='1200' height='800'>
{svg_defs}
  <rect width='100%' height='100%' fill='url(#bgGrad)'/>
  <rect width='100%' height='100%' fill='url(#grid)'/>

  <g transform='translate(60, 40)'>
    <rect width='1080' height='720' rx='12' fill='#100408' stroke='#641F36' stroke-width='2'/>
    
    <rect width='1080' height='40' rx='12' fill='#240713'/>
    <circle cx='30' cy='20' r='6' fill='#EF4444'/>
    <circle cx='50' cy='20' r='6' fill='#F59E0B'/>
    <circle cx='70' cy='20' r='6' fill='#10B981'/>
    <text x='420' y='25' fill='#DFB9BF' font-family='monospace' font-size='13' font-weight='bold'>veda --terminal --local-only (127.0.0.1)</text>

    <g transform='translate(35, 70)'>
      <text x='0' y='25' fill='#C28B9A' font-family='monospace' font-size='13' xml:space='preserve'>__     _______ ____    _      _   _ ___ </text>
      <text x='0' y='42' fill='#C28B9A' font-family='monospace' font-size='13' xml:space='preserve'>\\ \\   / / ____|  _ \\  / \\    | | | |_ _| </text>
      <text x='0' y='59' fill='#C28B9A' font-family='monospace' font-size='13' xml:space='preserve'> \\ \\ / /|  _| | | | |/ _ \\   | | | || |  </text>
      <text x='0' y='76' fill='#C28B9A' font-family='monospace' font-size='13' xml:space='preserve'>  \\ V / | |___| |_| / ___ \\  | |_| || |  </text>
      <text x='0' y='93' fill='#C28B9A' font-family='monospace' font-size='13' xml:space='preserve'>   \\_/  |_____|____/_/   \\_\\  \\___/|___| v2.4 (Truthful Diagnostics) </text>

      <text x='0' y='140' fill='#10B981' font-family='monospace' font-size='14'>[OK] Ollama loopback daemon verified (http://127.0.0.1:11434)</text>
      <text x='0' y='165' fill='#10B981' font-family='monospace' font-size='14'>[OK] Model loaded: qwen2.5-coder:7b (quantized Q4_K_M)</text>
      <text x='0' y='190' fill='#10B981' font-family='monospace' font-size='14'>[OK] Session DB: SQLite WAL journaling enabled (180MB RAM idle)</text>
      <text x='0' y='215' fill='#10B981' font-family='monospace' font-size='14'>[OK] Security: Loopback bind verified. Zero cloud telemetry packets</text>
      <text x='0' y='240' fill='#38BDF8' font-family='monospace' font-size='14'>[SYS] ANSI Console capability detector: Native VT100 enabled</text>

      <line x1='0' y1='270' x2='1010' y2='270' stroke='#380F1F' stroke-width='1.5'/>
      <text x='0' y='305' fill='#F59E0B' font-family='monospace' font-size='14' font-weight='bold'>veda&gt; explain ROS2 lifecycle nodes in C++</text>
      
      <text x='0' y='345' fill='#DFB9BF' font-family='monospace' font-size='13'>Assistant (streaming token-by-token at 42.6 t/s):</text>
      <text x='0' y='375' fill='#F7F0E7' font-family='monospace' font-size='13'>ROS 2 Lifecycle Nodes introduce a deterministic state machine for robotic safety:</text>
      <text x='0' y='400' fill='#C28B9A' font-family='monospace' font-size='13'>  1. Unconfigured -&gt; on_configure() -&gt; Inactive</text>
      <text x='0' y='425' fill='#C28B9A' font-family='monospace' font-size='13'>  2. Inactive     -&gt; on_activate()  -&gt; Active (Sensors &amp; Actuators Live)</text>
      <text x='0' y='450' fill='#C28B9A' font-family='monospace' font-size='13'>  3. Active       -&gt; on_deactivate()-&gt; Inactive</text>
      <text x='0' y='475' fill='#C28B9A' font-family='monospace' font-size='13'>  4. Any Error    -&gt; on_error()     -&gt; Finalized</text>

      <rect x='0' y='510' width='1010' height='80' rx='6' fill='#240713' stroke='#451425'/>
      <text x='20' y='540' fill='#10B981' font-family='monospace' font-size='13'>TEST SUITE: 98 unit tests passing (100% offline verification)</text>
      <text x='20' y='565' fill='#DFB9BF' font-family='monospace' font-size='12'>Cancellable worker thread: graceful Ctrl+C handling with cooperative tokens</text>
    </g>
  </g>
</svg>'''

# 7. netsentinel-terminal.svg
files['netsentinel-terminal.svg'] = f'''<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800' width='1200' height='800'>
{svg_defs}
  <rect width='100%' height='100%' fill='url(#bgGrad)'/>
  <rect width='100%' height='100%' fill='url(#grid)'/>

  <g transform='translate(60, 40)'>
    <rect width='1080' height='720' rx='12' fill='#0C0306' stroke='#641F36' stroke-width='2'/>
    
    <rect width='1080' height='40' rx='12' fill='#240713'/>
    <circle cx='30' cy='20' r='6' fill='#EF4444'/>
    <circle cx='50' cy='20' r='6' fill='#F59E0B'/>
    <circle cx='70' cy='20' r='6' fill='#10B981'/>
    <text x='380' y='25' fill='#EF4444' font-family='monospace' font-size='13' font-weight='bold'>NETSENTINEL v2.0 // RAW 802.11 SNIFFER (wlan0mon)</text>

    <g transform='translate(35, 65)'>
      <text x='0' y='25' fill='#F7F0E7' font-family='monospace' font-size='15' font-weight='bold'>RF MONITOR INTERFACE: wlan0mon | CH: 6 (2.437 GHz) | HOPPING: ENABLED</text>
      
      <rect x='0' y='45' width='1010' height='80' rx='8' fill='#EF4444' fill-opacity='0.2' stroke='#EF4444' stroke-width='1.5'/>
      <text x='20' y='75' fill='#EF4444' font-family='monospace' font-size='16' font-weight='bold'>[CRITICAL ALERT] DEAUTHENTICATION FLOOD DETECTED!</text>
      <text x='20' y='102' fill='#F7F0E7' font-family='monospace' font-size='13'>BURST RATE: 184 frames/sec | TARGET: 74:D2:1D:4A:88:B1 | ATTACK BSSID: 48:8F:5A:21:C0</text>

      <text x='0' y='155' fill='#C28B9A' font-family='monospace' font-size='13' font-weight='bold'>TIME      TYPE          SUBTYPE       SRC MAC            DST MAC            PWR   STATUS</text>
      <line x1='0' y1='165' x2='1010' y2='165' stroke='#380F1F' stroke-width='1.5'/>

      <text x='0' y='190' fill='#EF4444' font-family='monospace' font-size='13'>11:24:02  MANAGEMENT    DEAUTH (0x0C) 48:8F:5A:21:C0     74:D2:1D:4A:88:B1  -32   [BURST 1/5]</text>
      <text x='0' y='215' fill='#EF4444' font-family='monospace' font-size='13'>11:24:02  MANAGEMENT    DEAUTH (0x0C) 48:8F:5A:21:C0     74:D2:1D:4A:88:B1  -32   [BURST 2/5]</text>
      <text x='0' y='240' fill='#10B981' font-family='monospace' font-size='13'>11:24:02  BEACON        SSID: CAMPUS  12:88:A4:91:02:44  FF:FF:FF:FF:FF:FF  -64   [NORMAL]</text>
      <text x='0' y='265' fill='#38BDF8' font-family='monospace' font-size='13'>11:24:02  DATA          QoS DATA      A0:C5:89:14:B2:10  12:88:A4:91:02:44  -58   [ENCRYPTED]</text>
      <text x='0' y='290' fill='#F59E0B' font-family='monospace' font-size='13'>11:24:03  PROBE REQ     SSID: FREE    B4:2E:99:38:11:02  FF:FF:FF:FF:FF:FF  -44   [UNASSOCIATED]</text>

      <text x='0' y='335' fill='#DFB9BF' font-family='monospace' font-size='14' font-weight='bold'>SLIDING WINDOW FRAME FREQUENCY (LAST 60 SECONDS)</text>
      
      <g transform='translate(0, 350)'>
        <rect x='0' y='80' width='18' height='40' fill='#38BDF8'/>
        <rect x='25' y='75' width='18' height='45' fill='#38BDF8'/>
        <rect x='50' y='70' width='18' height='50' fill='#38BDF8'/>
        <rect x='75' y='65' width='18' height='55' fill='#38BDF8'/>
        <rect x='100' y='10' width='18' height='110' fill='#EF4444'/>
        <rect x='125' y='5' width='18' height='115' fill='#EF4444'/>
        <rect x='150' y='8' width='18' height='112' fill='#EF4444'/>
        <rect x='175' y='70' width='18' height='50' fill='#38BDF8'/>
        <rect x='200' y='75' width='18' height='45' fill='#38BDF8'/>
        <rect x='225' y='80' width='18' height='40' fill='#38BDF8'/>
        
        <text x='270' y='65' fill='#EF4444' font-family='monospace' font-size='13'>&lt;-- Anomalous Deauthentication Spike (Threshold: &gt;50 fps)</text>
        <text x='270' y='95' fill='#10B981' font-family='monospace' font-size='13'>Zero-drop ring buffer thread with lockless consumer queue</text>
      </g>

      <rect x='0' y='505' width='1010' height='85' rx='6' fill='#240713' stroke='#451425'/>
      <text x='20' y='535' fill='#DFB9BF' font-family='sans-serif' font-weight='bold' font-size='14'>NetSentinel v2.0 // Wireless Cyber-Physical Perimeter Defense</text>
      <text x='20' y='565' fill='#C28B9A' font-family='monospace' font-size='12'>Python 3 + Scapy + C pcap · 802.11 Anomaly Engine · Rich ANSI curses UI · Response Latency: 180ms</text>
    </g>
  </g>
</svg>'''

# 8. rakuzan-soc-dashboard.svg
files['rakuzan-soc-dashboard.svg'] = f'''<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800' width='1200' height='800'>
{svg_defs}
  <rect width='100%' height='100%' fill='url(#bgGrad)'/>
  <rect width='100%' height='100%' fill='url(#grid)'/>

  <rect x='40' y='35' width='1120' height='55' rx='8' fill='#451425' stroke='#C28B9A' stroke-width='1.5'/>
  <text x='65' y='68' fill='#F7F0E7' font-family='sans-serif' font-weight='bold' font-size='20' letter-spacing='2'>RAKUZAN SOC // REPO ENTROPY SCANNER &amp; THREAT MONITOR</text>
  <text x='960' y='68' fill='#C28B9A' font-family='monospace' font-size='16'>FASTAPI + REACT + DOCKER</text>

  <g transform='translate(60, 115)'>
    <rect width='660' height='490' rx='12' fill='#120409' stroke='#641F36' stroke-width='2'/>
    <text x='25' y='40' fill='#F7F0E7' font-family='monospace' font-size='16' font-weight='bold'>SHANNON ENTROPY DISTRIBUTION ON COMMIT DIFFS</text>
    <text x='25' y='65' fill='#C28B9A' font-family='monospace' font-size='13'>THRESHOLD H &gt; 4.5 BITS/CHAR INDICATES HIGH SECRETS RISK</text>

    <line x1='50' y1='100' x2='50' y2='270' stroke='#DFB9BF' stroke-width='1.5'/>
    <line x1='50' y1='270' x2='610' y2='270' stroke='#DFB9BF' stroke-width='1.5'/>
    
    <path d='M 50 260 Q 150 250 250 180 T 400 240 T 520 80 T 600 250' fill='none' stroke='#38BDF8' stroke-width='3'/>
    
    <line x1='50' y1='120' x2='610' y2='120' stroke='#EF4444' stroke-width='2' stroke-dasharray='6 4'/>
    <text x='55' y='112' fill='#EF4444' font-family='monospace' font-size='12'>CRITICAL ENTROPY THRESHOLD (H = 4.8)</text>

    <circle cx='520' cy='80' r='8' fill='#EF4444' stroke='#F7F0E7' stroke-width='2'/>
    <text x='430' y='60' fill='#EF4444' font-family='monospace' font-size='12' font-weight='bold'>FLAGGED SECRET (H = 5.62)</text>

    <rect x='25' y='300' width='610' height='165' rx='8' fill='#240713' stroke='#451425'/>
    <text x='40' y='330' fill='#DFB9BF' font-family='monospace' font-size='13' font-weight='bold'>FLAGGED TOKENS IN COMMIT a7f3b19:</text>
    <text x='40' y='360' fill='#EF4444' font-family='monospace' font-size='12'>[CRITICAL] AWS_SECRET_KEY pattern detected in /config/s3_backup.py</text>
    <text x='40' y='385' fill='#F59E0B' font-family='monospace' font-size='12'>[WARNING] High-entropy RSA private block header in /certs/deploy.pem</text>
    <text x='40' y='410' fill='#10B981' font-family='monospace' font-size='12'>[RESOLVED] Pre-commit hook blocked push; developer notified in &lt;1.2s</text>
    <text x='40' y='435' fill='#38BDF8' font-family='monospace' font-size='12'>[PERF] 10,000+ commit lines processed in 1.18 seconds</text>
  </g>

  <g transform='translate(750, 115)'>
    <rect width='390' height='490' rx='12' fill='#120409' stroke='#641F36' stroke-width='2'/>
    <text x='25' y='40' fill='#F7F0E7' font-family='monospace' font-size='16' font-weight='bold'>SCANNER SPECIFICATIONS</text>

    <rect x='25' y='65' width='340' height='85' rx='8' fill='#240713'/>
    <text x='40' y='95' fill='#10B981' font-family='sans-serif' font-weight='bold' font-size='22'>120+ PATTERNS</text>
    <text x='40' y='120' fill='#C28B9A' font-family='monospace' font-size='12'>AWS, GitHub, Slack, SSH Keys</text>

    <rect x='25' y='165' width='340' height='85' rx='8' fill='#240713'/>
    <text x='40' y='195' fill='#38BDF8' font-family='sans-serif' font-weight='bold' font-size='22'>&lt;1.2s SCAN TIME</text>
    <text x='40' y='220' fill='#C28B9A' font-family='monospace' font-size='12'>High-throughput Async Pipeline</text>

    <rect x='25' y='265' width='340' height='85' rx='8' fill='#240713'/>
    <text x='40' y='295' fill='#DFB9BF' font-family='sans-serif' font-weight='bold' font-size='22'>0 FALSE COMMITS</text>
    <text x='40' y='320' fill='#C28B9A' font-family='monospace' font-size='12'>Pre-commit Webhook Gatekeeper</text>

    <rect x='25' y='365' width='340' height='100' rx='8' fill='#240713'/>
    <text x='40' y='395' fill='#DFB9BF' font-family='monospace' font-size='13' font-weight='bold'>PIPELINE STACK</text>
    <text x='40' y='420' fill='#C28B9A' font-family='sans-serif' font-size='12'>Git Hook -&gt; FastAPI -&gt; Redis Worker -&gt; React Dashboard</text>
  </g>

  <rect x='40' y='630' width='1120' height='120' rx='10' fill='#380F1F' stroke='#641F36' stroke-width='1.5'/>
  <text x='65' y='665' fill='#DFB9BF' font-family='serif' font-size='20' font-weight='bold'>Rakuzan SOC: Real-Time Security Operations &amp; Secrets Prevention</text>
  <text x='65' y='695' fill='#F7F0E7' font-family='sans-serif' font-size='14'>Designed &amp; Engineered by Vasudev Saras K M</text>
  <text x='65' y='722' fill='#C28B9A' font-family='monospace' font-size='13'>FastAPI Backend · Redis Task Queue · Shannon Entropy Math Core · React 18 / Tailwind CSS</text>
</svg>'''

os.makedirs('public/assets/projects', exist_ok=True)
for fname, content in files.items():
    p = os.path.join('public/assets/projects', fname)
    with open(p, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Created {fname}')
