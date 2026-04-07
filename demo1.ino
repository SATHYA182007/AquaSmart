#define SOIL_PIN    34
#define RAIN_PIN    35
#define TDS_PIN     32
#define MOTOR_PIN   26
#define FERT_PIN    27

// ── Thresholds ────────────────────────────────────────────────────────────────
const int DRY_THRESHOLD   = 30;    // % -> irrigation ON below this
const int WET_THRESHOLD   = 35;    // % -> irrigation OFF above this
const int RAIN_THRESHOLD  = 500;   // <-- adjust after calibration
const int TDS_THRESHOLD   = 2500;  // raw ADC
const int SAMPLE_COUNT    = 10;    // more stable averaging

// Fertilizer duty cycle
const unsigned long FERT_PERIOD_MS = 60000UL; // 60 s
const unsigned long FERT_ON_MS     = 10000UL; // 10 s

// Rain debounce: require rain to be present for this long before OFF
const unsigned long RAIN_CONFIRM_MS = 3000UL;

// ── State ─────────────────────────────────────────────────────────────────────
bool motorOn       = false;
bool fertOn        = false;
bool rainConfirmed = false;

unsigned long fertCycleStart = 0;
unsigned long rainStartTime  = 0;

// ── Helpers ───────────────────────────────────────────────────────────────────
int averageRead(int pin) {
  long sum = 0;
  for (int i = 0; i < SAMPLE_COUNT; i++) {
    sum += analogRead(pin);
    delay(10);
  }
  return (int)(sum / SAMPLE_COUNT);
}

int toMoisture(int raw) {
  // Calibrate these values for your soil sensor
  const int DRY_RAW = 3500;
  const int WET_RAW = 1500;

  return constrain(map(raw, DRY_RAW, WET_RAW, 0, 100), 0, 100);
}

// ── Setup ─────────────────────────────────────────────────────────────────────
void setup() {
  Serial.begin(115200);

  pinMode(MOTOR_PIN, OUTPUT);
  pinMode(FERT_PIN, OUTPUT);

  digitalWrite(MOTOR_PIN, LOW);
  digitalWrite(FERT_PIN, LOW);

  fertCycleStart = millis();

  Serial.println("======================================");
  Serial.println(" SMART IRRIGATION SYSTEM STARTED ");
  Serial.println("======================================");
}

// ── Main loop ─────────────────────────────────────────────────────────────────
void loop() {
  int soilRaw = averageRead(SOIL_PIN);
  int rainRaw = averageRead(RAIN_PIN);
  int tdsRaw  = averageRead(TDS_PIN);

  int moisture = toMoisture(soilRaw);

  // ── Rain detection (LOW = wet for most modules)
  bool rainNow = (rainRaw < RAIN_THRESHOLD);

  // ── Debounce rain detection
  if (rainNow) {
    if (rainStartTime == 0) rainStartTime = millis();

    if (millis() - rainStartTime >= RAIN_CONFIRM_MS) {
      rainConfirmed = true;
    }
  } else {
    rainStartTime = 0;
    rainConfirmed = false;
  }

  // ── Water quality check
  bool waterGood = (tdsRaw < TDS_THRESHOLD);

  // ── Soil moisture hysteresis
  if (!motorOn && moisture < DRY_THRESHOLD) {
    motorOn = true;
  }

  if (motorOn && moisture > WET_THRESHOLD) {
    motorOn = false;
  }

  // ── Safety overrides
  if (rainConfirmed || !waterGood) {
    motorOn = false;
  }

  // ── Fertilizer control (only when irrigating)
  if (motorOn) {
    unsigned long elapsed = millis() - fertCycleStart;

    if (elapsed >= FERT_PERIOD_MS) {
      fertCycleStart = millis();
      elapsed = 0;
    }

    fertOn = (elapsed < FERT_ON_MS);
  } else {
    fertOn = false;
    fertCycleStart = millis();
  }

  // ── Apply outputs
  digitalWrite(MOTOR_PIN, motorOn ? HIGH : LOW);
  digitalWrite(FERT_PIN, fertOn ? HIGH : LOW);

  // ── Serial Monitor Output
  Serial.println("---- SENSOR DATA ----");
  Serial.print("Soil raw: "); Serial.print(soilRaw);
  Serial.print("  Moisture: "); Serial.print(moisture); Serial.println("%");

  Serial.print("Rain raw: "); Serial.print(rainRaw);
  Serial.print("  Rain now: "); Serial.print(rainNow ? "YES" : "NO");
  Serial.print("  Confirmed: "); Serial.println(rainConfirmed ? "YES" : "NO");

  Serial.print("TDS raw: "); Serial.print(tdsRaw);
  Serial.print("  Water good: "); Serial.println(waterGood ? "YES" : "NO");

  Serial.print("Motor: "); Serial.println(motorOn ? "ON" : "OFF");
  Serial.print("Fertilizer: "); Serial.println(fertOn ? "ON" : "OFF");

  if (rainConfirmed) {
    Serial.println("STATUS: Rain detected — system OFF");
  } else if (!waterGood) {
    Serial.println("STATUS: High TDS — system OFF");
  } else if (motorOn) {
    if (fertOn) {
      Serial.println("STATUS: Irrigating + fertilizing");
    } else {
      Serial.println("STATUS: Irrigating");
    }
  } else {
    Serial.println("STATUS: Soil OK — standby");
  }

  Serial.println();
  delay(2000);
}