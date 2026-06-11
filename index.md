---
layout: default
title: Wallet hereditaria con Safe
---

# Wallet hereditaria con Safe

Investigación y desarrollo de una solución de wallet criptográfica hereditaria basada en Smart Accounts y Account Abstraction (ERC-4337).

## ¿Dónde radica el valor de ERC-4337 y las Smart Accounts en este proyecto?

El núcleo de **Legacy Wallet** se basa en delegar la custodia y la lógica en contratos inteligentes y estándares de abstracción de cuentas, lo que aporta beneficios críticos frente a una wallet tradicional (EOA):

- **Custodia Inteligente (Smart Accounts / Safe)**: Los fondos y tokens no dependen de una única frase semilla expuesta del titular. Se custodian en una **Safe Account**, permitiendo programabilidad on-chain y la adición de módulos de extensión (como nuestro `InheritanceModule`).
- **Transacciones Patrocinadas (Gasless Claims)**: La mayor barrera de la Web3 es la necesidad de tener gas (ETH) para transaccionar. En un proceso de herencia, los beneficiarios pueden estar desconectados de la blockchain. Con el **Safe Relay Kit (Gelato / ERC-4337)**, los herederos pueden co-firmar y reclamar los fondos de forma completamente gratuita. Las transacciones son pagadas por un Relay/Sponsor (Paymaster).
- **Gestión Modular de Herencia**: El `InheritanceModule` actúa como un Safe Module. El titular puede instalarlo o desinstalarlo directamente desde su panel de control de Safe, otorgándole un control y revocación absoluta on-chain sin necesidad de migrar sus fondos.
- **Validación de Identidad Flexible (Oráculo PKI)**: Permite vincular identidades legales (como firmas de testamentos notariales digitales X.509) con las direcciones de la blockchain a través de validación criptográfica en el oráculo.

---

## Documentación

- [Inicio](docs/inicio.md)
- [Brainstorming Estratégico](docs/brainstorming.md)
- [Especificación Técnica](docs/especificacion-tecnica.md)
- [ERC-4337: EOA vs Smart Accounts](docs/erc4337-flujos.md)
- [Roadmap: 4 Sprints](docs/roadmap.md)
- [Planificación: Implementación con Safe](docs/planificacion.md)
- [Decisiones del Proyecto](docs/planificacion.md#decisiones-de-diseño-para-el-mvp-simplificadoeconómico)
- [Flujo Comparativo Detallado](docs/ERC4337_EOA_vs_SmartAccounts.md)
- [Presentación en Obsidian](docs/presentacion-obsidian.md)
- [Guía de Despliegue de la dApp](GUIA_DESPLIEGUE.md)

## Estado

- Estado: En curso
- Prioridad: Alta
- Fecha inicio: 05 Junio 2026
- Fecha estimada: 12 Junio 2026
