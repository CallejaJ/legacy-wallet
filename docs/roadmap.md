# Roadmap: 4 Sprints de Implementación

## Sprint 1: Diseño (Semana 1)

Objetivo: Establecer la visión visual y arquitectónica del proyecto

Tareas:

- Crear wireframes para modo hereditario (4+ pantallas)
- Diagrama de flujo: testamento → smart contract
- Diagrama de arquitectura técnica general
- Definir interfaz del oráculo (inputs/outputs)
- Mapeo de pantallas: carga certificado, mapeo beneficiarios, revalidación

Entregables:

- Figma con wireframes completos
- Diagramas de arquitectura (Draw.io)
- Documento de interfaz del oráculo

---

## Sprint 2: Backend + Oráculo (Semana 2-3)

Objetivo: Implementar lógica backend y contrato inteligente

Tareas:

- Implementar endpoint para validar PKI (OpenSSL)
- Parsing del testamento (OCR o manual)
- Deploy del módulo ERC-4337 en testnet
- Integración con Paymaster
- Unit tests (15 test cases)

Entregables:

- Backend funcional con validación PKI
- Smart contract InheritanceModule deployable
- Tests completados al 100%
- Documentación de API

---

## Sprint 3: Frontend (Semana 4-5)

Objetivo: Interfaz completa y funcional

Tareas:

- Implementar carga de certificado PKI
- Mapeo de beneficiarios desde testamento
- Flujo de reclamación para heredero
- Integración con UserOperation (ERC-4337)
- Integration tests con Paymaster
- Refinamiento UI/UX

Entregables:

- Frontend completamente funcional
- Tests de integración completados
- UI refinado y responsive
- Manual de usuario

---

## Sprint 4: Demo + Presentación (Semana 6-7)

Objetivo: PoC funcionando y presentación ejecutiva

Tareas:

- PoC end-to-end (testamento → payout ejecutado)
- Documentación técnica final
- Creación de presentación ejecutiva
- Diagramas y visuales finales
- Video demo funcional

Entregables:

- PoC completamente funcional
- Presentación Canva/Slides
- Documentación técnica PDF
- Video demo (5-10 minutos)
- Repositorio público con README

---

## Timeline Visual

```
Mayo 15  | ----SPRINT 1---- | Mayo 22
         |   Diseño         |

Mayo 22  | -------SPRINT 2------- | Junio 5
         |  Backend + Oráculo    |

Junio 5  | -------SPRINT 3------- | Junio 19
         |      Frontend         |

Junio 19 | ----SPRINT 4---- | Junio 30
         | Demo + Presenta. |
```

## Hitos Críticos

- **Junio 1:** Especificación de diseño aprobada
- **Junio 8:** Backend + Oráculo funcional
- **Junio 15:** Frontend integrado
- **Junio 30:** Presentación final

## Dependencias

- Sprint 1 → Bloquea Sprint 2 (necesita especificación)
- Sprint 2 → Bloquea Sprint 3 (necesita API)
- Sprint 3 → Bloquea Sprint 4 (necesita frontend)

## Recursos Necesarios

- 1 Frontend Developer (React)
- 1 Backend Developer (Node.js)
- 1 Smart Contract Developer (Solidity)
- 1 PKI/Security Expert
- 1 Product Designer

---

Última actualización: 15 Mayo 2026
