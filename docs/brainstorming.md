# Brainstorming: Wallet hereditaria con Safe

## La Síntesis

Documento estratégico que cruza enfoque notarial + ERC-4337 smart accounts

- **Testamento notarial:** Certificado PKI firmado por autoridad
- **Smart Account:** ERC-4337 con módulos instalables
- **Módulo herencia:** Dead-man's switch + beneficiarios + payout atómico
- **Heredero gasless:** Paymaster patrocina transacciones

## Flujo Híbrido Propuesto (4 Fases)

### FASE 1: Formalización Legal

Usuario va a notario y obtiene certificado de últimas voluntades (PKI firmado)

### FASE 2: Validación On-Chain

- Wallet hereditaria con Safe recibe certificado
- Oráculo verifica firma electrónica
- Instala módulo ERC-4337 de herencia

### FASE 3: Activación Smart Contract

- Dead-man's switch: 6 meses inactividad
- Beneficiarios: los designados en notaría
- Pesos: especificados en testamento
- Paymaster: Wallet hereditaria con Safe patrocina gas

### FASE 4: Ejecución (Fallecimiento)

- Heredero inicia reclamación
- Quórum de herederos firma (passkey, sin ETH)
- Payout atómico con distribución

## Pantallas Principales

1. **Pre-onboarding:** Modo normal vs Modo hereditario
2. **Carga de certificado (PKI):** Solicita al Ministerio/Notario
3. **Mapeo testamento → herederos:** Vincula direcciones cripto
4. **Revalidación periódica:** Renovar certificado cuando expire

## Diferenciadores vs Alternativas

| Wallet hereditaria con Safe           | Safe | Gnosis  | Otros   |
| ------------------------------------- | ---- | ------- | ------- |
| Testamento notarial legalmente válido | ✗    | ✗       | ✗       |
| PKI oficial (Ministerio)              | ✓    | ✗       | ✗       |
| ERC-4337 modular                      | ✓    | Parcial | Parcial |
| Heredero gasless                      | ✓    | ✗       | ✗       |
| EOA upgrade (EIP-7702)                | ✓    | ✗       | ✗       |

## Casos de Uso

### Caso 1: Flujo Normal (Fallecimiento)

- Día 1: Usuario registra herencia (cert. notarial validado)
- Día 200: Usuario muere, no abre app
- Día 181: Pasa inactivityThreshold (6 meses)
- Heredero inicia reclamación
- Quórum firma
- Payout atómico distribuye activos

### Caso 2: Falso Positivo (Usuario Vivo)

- Usuario no abre app por viaje/pérdida teléfono
- Heredero inicia reclamación
- Usuario se da cuenta y ejecuta cancelClaim()
- Vuelve a estado ACTIVE

### Caso 3: Testamento Modificado

- Usuario va a notario y hace nuevo testamento
- Obtiene nuevo certificado PKI
- Sube nuevo certificado a Wallet hereditaria con Safe
- Oráculo valida, beneficiarios se actualizan

## Arquitectura General

```
Frontend (Wallet hereditaria con Safe app)
    ↓
[Carga certificado PKI]
    ↓
Backend (notarización)
    ↓
Oracle (validación PKI)
    ├─ Verifica firma electrónica
    ├─ Valida emisor (Ministerio/Notaría)
    └─ Guarda hash en blockchain
    ↓
Smart Account (ERC-4337)
    ├─ Módulo herencia
    ├─ Paymaster (sponsors gas)
    └─ Herederos + pesos
```

## Herramientas Clave

- **ERC-4337:** Módulos para herencia
- **Oráculo:** ¿Chainlink? ¿Custom?
- **PKI:** OpenSSL o librería JS para validar firmas .p7m
- **Storage:** IPFS/Arweave para certificados (inmutable)

## Casos de Uso: NICE TO HAVE

### "Definir múltiples beneficiarios con pesos"

Ya lo hace el testamento notarial. La app solo mapea y sincroniza:

1. **Testamento = verdad única** → App solo lee y ejecuta
2. **App permite sobrescribir** → Crea testamento digital (grey area legal)
3. **Híbrido:** Testamento base, app permite ajustes menores

## GAS en Token No Nativo

ERC-4337 Paymaster ya lo soporta:

```
Heredero firma reclamación
    ↓
Paymaster valida transacción
    ↓
¿Quién paga gas?
    Option A: Wallet hereditaria con Safe (tercera parte)
    Option B: Token ERC-20 + conversión a ETH
    Option C: Asset heredado paga su propio gas
```

---

Última actualización: 15 Mayo 2026
