# InheritanceModule: Especificación Técnica ERC-4337

## Resumen Ejecutivo

El **InheritanceModule** es un módulo ERC-4337 que implementa lógica de herencia digital con:

- Dead-man's switch (inactividad dispara reclamación)
- Múltiples beneficiarios con pesos (%)
- Validación de certificado PKI notarial
- Quórum de co-firmantes (herederos)
- Payout atómico (batch múltiples transferencias, ETH + ERC-20)
- Compatibilidad con Paymaster (heredero firma sin ETH)

## Flujo de Estados

```
1. INITIALIZATION
   └─ configureInheritance() [solo oráculo, post-validación PKI]
      └─ Módulo instalado, herencia ACTIVA

2. ACTIVE STATE
   ├─ Titular vivo: submitProofOfLife() periódicamente
   └─ Heredero: espera

3. CLAIM PHASE (inactividad > umbral)
   ├─ initiateClaim() [heredero inicia]
   ├─ signClaim() [herederos firman hasta quórum]
   └─ Período de gracia (14 días para cancelar)

4. EXECUTION PHASE
   ├─ executePayout() [batch distribute a beneficiarios]
   ├─ Desinstalar módulo automáticamente
   └─ FIN

5. CANCELLATION (cualquier momento)
   └─ cancelClaim() [titular vivo]
      └─ Reset a ACTIVE STATE
```

## Funciones Principales

### configureInheritance()

**Llamada por:** Oráculo (post-validación notarial)

```solidity
function configureInheritance(
    address account,
    address[] calldata beneficiaries,   // [0xLucía, 0xMarc, 0xPau]
    uint256[] calldata weights,         // [5000, 3000, 2000] = 100%
    uint256 inactivityThreshold,        // 6 meses = 15552000 segundos
    uint256 quorumRequired,             // 2 de 3 herederos
    bytes32 certificateHash,            // Hash del cert. notarial
    uint256 certExpiryTimestamp         // Cuándo caduca
) external
```

### submitProofOfLife()

**Llamada por:** Titular (cada X meses)

Actualiza lastProofOfLife = block.timestamp. Si hay reclamación en curso, la cancela.

### initiateClaim()

**Llamada por:** Beneficiario cuando cree que titular falleció

Precondiciones:

- Inactividad > threshold
- Certificado no expirado
- No hay reclamación anterior

### signClaim()

**Llamada por:** Cada heredero (co-firmantes)

Registra firma del beneficiario. Verifica si quórum alcanzado.

### executePayout()

**Llamada por:** Cualquier beneficiario

Distribución atómica:

```
share[beneficiary] = asset_amount * weight[beneficiary] / 10000
```

Ejemplo (4.217 Ξ):

- Lucía (50%): 2.1085 Ξ
- Marc (30%): 1.2651 Ξ
- Pau (20%): 0.8434 Ξ

### cancelClaim()

**Llamada por:** Titular (si sigue vivo)

Reset: claimInitiated = false, vuelve a ACTIVE STATE

## Integración con ERC-4337

### UserOperation para firmar reclamación

```javascript
const userOp = {
  sender: smartAccount.address,
  nonce: await smartAccount.getNonce(),
  initCode: "0x",
  callData: inheritanceModule.interface.encodeFunctionData("signClaim", [
    account,
    signature,
  ]),
  accountGasLimits: encodeGasLimits(100000, 100000),
  preVerificationGas: 50000,
  gasPricesAndWeights: encodeGasPrices(1, 1),
  signature: luciaSignature,
};
```

## Integración con Paymaster

### Flow para heredero gasless

```
1. Heredero firma con passkey (Face ID)
   ↓
2. Crea UserOp (signClaim) con paymasterAddress
   ↓
3. Bundler verifica paymasterAddress válido
   ↓
4. Paymaster.validatePaymasterUserOp() valida:
   - ¿Es beneficiario?
   - ¿Hay reclamación en curso?
   - ¿Es sensato pagar gas?
   ↓
5. Paymaster sponsoriza: TransactionFee = 0 para heredero
   ↓
6. ExecutePayout() también covered por paymaster
```

## Seguridad: Ataques Mitigados

| Ataque                     | Mitigación                                                   |
| -------------------------- | ------------------------------------------------------------ |
| Heredero falso reclama     | Múltiples beneficiarios = quórum requerido                   |
| Reclamación prematura      | Inactividad > threshold                                      |
| Período de gracia ignorado | `require(block.timestamp <= claimInitiatedAt + gracePeriod)` |
| Certificado expirado       | `require(block.timestamp <= certExpiryTimestamp)`            |
| Payout múltiple            | `require(!executed)`                                         |
| Titular vivo pero inactivo | `submitProofOfLife()` cancela reclamación                    |

## Plan de Testing

### Unit Tests

- ConfigureInheritance_Valid()
- ConfigureInheritance_InvalidWeights()
- ConfigureInheritance_QuorumTooHigh()
- SubmitProofOfLife_UpdatesTimestamp()
- SubmitProofOfLife_CancelsClaim()
- InitiateClaim_BeforeThreshold_Fails()
- InitiateClaim_Valid()
- SignClaim_Counts()
- ExecutePayout_QuorumNotReached_Fails()
- ExecutePayout_WithinGracePeriod_Works()
- ExecutePayout_GracePeriodExpired_Fails()
- CancelClaim_ByOwner()
- CancelClaim_NotOwner_Fails()
- RevalidateCertificate()
- UninstallModule()

### Integration Tests

- SignClaim_Gasless_WithPaymaster()
- ExecutePayout_MultipleCurrencies()
- ExecutePayout_AllOrNothing()

## Gas Optimization

- Usar `mapping` en lugar de arrays para beneficiarios
- Cache `weights` en storage durante `executePayout()`
- Usar `SSTORE2` para certificateHash si se archiva
- Considerar delegatecall para lógica pesada

## Interoperabilidad

### Cadenas Soportadas

- Ethereum Mainnet
- Polygon
- Arbitrum
- Cualquier rollup compatible ERC-4337

### Tokens Soportados

- ETH nativo
- ERC-20 (USDC, USDT, DAI, etc.)
- Batch múltiples en una sola `executePayout()`

### Wallets Compatibles

- Cualquier smart account que soporte módulos ERC-4337
- Recomendación: Rhinestone, Alchemy's Light Account, ZeroDev

---

Última actualización: 15 Mayo 2026
