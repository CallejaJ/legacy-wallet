# Inicio: Documentación Central

Bienvenido a Fortris. Esta es tu guía para entender el proyecto.

## Mision

Investigación y desarrollo de una solución de wallet criptográfica hereditaria que permita:

- Formalizar testamentos digitales con PKI notarial
- Crear smart accounts con ERC-4337
- Designar múltiples herederos con distribución automática
- Realizar transacciones gasless para herederos

## Vision

Un sistema legal y seguro donde los usuarios puedan transferir sus activos cripto a herederos designados de forma automatizada, confiable y sin fricciones técnicas.

## Documentación Disponible

### Estrategia

- [Brainstorming: Fortris - Wallet Hereditaria](brainstorming.md)
  Síntesis del enfoque, flujo híbrido, wireframes, casos de uso

### Técnica

- [InheritanceModule - Especificación ERC-4337](especificacion-tecnica.md)
  Funciones Solidity, flujo de estados, testing, seguridad

### Planificación

- [Roadmap: 4 Sprints](roadmap.md)
  Sprint 1 (Diseño) → Sprint 4 (Demo)

### Seguimiento

- [Tareas y Progreso](tareas.md)
  22 tareas organizadas por fase, categoría, prioridad

### Pendientes

- [Preguntas sin Resolver](preguntas-pendientes.md)
  15 preguntas críticas que necesitan respuesta

## Stack Técnico Propuesto

**Frontend:** React/TypeScript + Paskeys para firmado de transacciones

**Backend:** Node.js + Validación PKI de certificados notariales

**Smart Contracts:**

- ERC-4337 (Account Abstraction - smart accounts)
- InheritanceModule (módulo custom de herencia)
- Paymaster (para transacciones gasless)

**Cadenas:** Ethereum, Polygon, Arbitrum (EVM compatible)

**Oráculo:** A definir (Chainlink o solución custom)

## Fases del Proyecto

### Fase 1: Formalización Legal

Usuario obtiene certificado notarial digital firmado con PKI

### Fase 2: Validación On-Chain

Oráculo verifica certificado y instala módulo ERC-4337

### Fase 3: Activación Smart Contract

Módulo se arma con beneficiarios, pesos, dead-man's switch

### Fase 4: Ejecución

Heredero inicia reclamación, quórum firma, payout atómico

## Roadmap General

- **Sprint 1 (Semana 1):** Diseño (wireframes, diagramas)
- **Sprint 2 (Semana 2-3):** Backend + Oráculo
- **Sprint 3 (Semana 4-5):** Frontend
- **Sprint 4 (Semana 6-7):** Demo + Presentación

## Como Contribuir

1. Lee la documentación relevante
2. Consulta el tablero de tareas
3. Responde las preguntas pendientes
4. Actualiza el progreso en el repositorio

## Contactos

| Nombre | Rol |
|---|---|
| **Jaime Cabrera** | Co-autor |
| **Martina Rojas** | Co-autora |
| **Jorge Calleja** | Co-autor |

---

Última actualización: 15 Mayo 2026
