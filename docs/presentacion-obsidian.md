# Wallet hereditaria con Safe: Wallet Hereditaria EIP-4337

Presentación para Obsidian Slides

---

## Slide 1: Portada

Wallet hereditaria con Safe: Wallet Hereditaria EIP-4337

Investigación y desarrollo de solución de wallet criptográfica hereditaria

Jorge Calleja Pérez
Mayo 2026

---

## Slide 2: El Problema

Como usuario de criptomonedas, quiero:

- Designar herederos para mis activos
- Hacerlo de forma legal y segura
- Que sea transparente y automático
- Que sea gasless para los herederos

Actualmente: NO HAY SOLUCIÓN VIABLE

---

## Slide 3: La Solución

Wallet hereditaria con Safe combina:

1. Testamento notarial digital (PKI)
2. Smart accounts con ERC-4337
3. Módulo de herencia inteligente
4. Transacciones gasless (Paymaster)

= Herencia digital legal y segura

---

## Slide 4: Flujo Híbrido (4 Fases)

FASE 1: Usuario obtiene certificado notarial (PKI)

FASE 2: Wallet hereditaria con Safe valida certificado con oráculo

FASE 3: Instala módulo ERC-4337 de herencia

FASE 4: Heredero reclama activos automáticamente

---

## Slide 5: Flujo Técnico

```
Usuario → Notario → Cert PKI
         ↓
      Wallet hereditaria con Safe
         ↓
      Oracle
         ↓
 Smart Account (ERC-4337)
         ↓
 InheritanceModule
         ↓
      Paymaster
         ↓
    Heredero (gasless)
```

---

## Slide 6: Dead-Man's Switch

Si titular no abre app en 6 meses:

- Heredero puede iniciar reclamación
- Quórum de herederos firma
- Distribución automática de activos
- Período de gracia: 14 días

---

## Slide 7: Diferenciadores

vs Safe, Gnosis, otros:

✓ Testamento notarial legalmente válido
✓ PKI oficial del Ministerio
✓ ERC-4337 modular
✓ Heredero gasless
✓ EOA upgrade (EIP-7702)

---

## Slide 8: Stack Técnico

Frontend: React/TypeScript + Paskeys

Backend: Node.js + Validación PKI

Contracts: Solidity + ERC-4337

Cadenas: Ethereum, Polygon, Arbitrum

Oráculo: A definir (Chainlink o custom)

---

## Slide 9: Roadmap (4 Sprints)

Sprint 1 (Semana 1): Diseño

- Wireframes, diagramas, especificación

Sprint 2 (Semana 2-3): Backend + Oráculo

- Validación PKI, smart contract, tests

Sprint 3 (Semana 4-5): Frontend

- Interfaz, integración, UX

Sprint 4 (Semana 6-7): Demo + Presentación

- PoC funcionando, documentación final

---

## Slide 10: Casos de Uso

CASO 1: Flujo Normal

- Usuario fallece → Heredero reclama → Payout automático

CASO 2: Falso Positivo

- Usuario vive → Cancela reclamación → Activa nuevamente

CASO 3: Testamento Modificado

- Nuevo testamento → Nuevo certificado → Actualización

---

## Slide 11: Seguridad

Mitigaciones:

- Múltiples beneficiarios = quórum requerido
- Inactividad > 6 meses para reclamar
- Período de gracia de 14 días
- Certificado con validez limitada
- Proof of Life cancela reclamación

---

## Slide 12: Preguntas Críticas (1/2)

1. ¿Chainlink u oráculo custom?
2. ¿Ethereum, Polygon o Arbitrum?
3. ¿Testamento = ley o permite cambios en app?
4. ¿6 meses fijos o variable?
5. ¿Quién paga costos notariales?
6. ¿GDPR compliant?
7. ¿Responsabilidad si oráculo falla?

---

## Slide 13: Preguntas Críticas (2/2)

8. ¿Herederos menores de edad?
9. ¿Múltiples cadenas simultáneamente?
10. ¿Recovery si se pierde passkey?
11. ¿Qué si mayoría de herederos desaparecen?
12. ¿Heredero puede impugnar herencia?
13. ¿Revalidación periódica automática?
14. ¿Recovery si oráculo falla?
15. ¿Modelo de ingresos de Wallet hereditaria con Safe?

---

## Slide 14: Cronograma

15 Mayo: Inicio
30 Junio: Presentación final

Sprint 1: May 15-22 (Diseño)
Sprint 2: May 22 - Jun 5 (Backend)
Sprint 3: Jun 5-19 (Frontend)
Sprint 4: Jun 19-30 (Demo)

---

## Slide 15: Equipo Requerido

1 Frontend Developer (React)
1 Backend Developer (Node.js)
1 Smart Contract Engineer (Solidity)
1 PKI/Security Expert
1 Product Designer

---

## Slide 16: Próximos Pasos

1. Responder 15 preguntas con tutores
2. Validar stack técnico
3. Comenzar Sprint 1 (Diseño)
4. Asignar responsables
5. Definir fechas límite

---

## Slide 17: Conclusión

Wallet hereditaria con Safe cubre un gap importante:

Herencia digital legal
Segura
Automatizada
Accesible

Vamos a construir algo increíble

---

## Como Usar Esta Presentación en Obsidian

1. Descarga el archivo PRESENTACION-OBSIDIAN.md
2. Abre en Obsidian
3. Instala el plugin "Obsidian Slides" (Community Plugins)
4. Presiona Ctrl+Shift+S para iniciar presentación
5. Navega con flechas o click

Cada --- representa una nueva slide

---

## Recursos Adicionales

Documentación: /docs
Especificación Técnica: docs/especificacion-tecnica.md
Brainstorming: docs/brainstorming.md
Preguntas Pendientes: docs/preguntas-pendientes.md

GitHub: https://github.com/CallejaJ/wallet-hereditaria
