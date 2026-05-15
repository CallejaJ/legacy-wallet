# Tareas y Seguimiento

## Estado General: 22 Tareas

| Fase                    | Cantidad | Estado      |
| ----------------------- | -------- | ----------- |
| Investigación Técnica   | 4        | Sin empezar |
| Definición del Problema | 2        | Sin empezar |
| Solución Técnica        | 1        | Sin empezar |
| Arquitectura & Diseño   | 8        | Sin empezar |
| Testing                 | 7        | Sin empezar |

---

## Fase 1: Investigación Técnica (4 Tareas)

- [ ] Investigar protocolo EIP-4337
      Prioridad: Alta | Estado: Sin empezar
      Revisar especificación oficial en https://eips.ethereum.org/EIPS/eip-4337

- [ ] Diferencias: EOA Smart Wallet vs Traditional Wallet
      Prioridad: Alta | Estado: Sin empezar
      Documentar diferencias clave en contexto de EIP-4337

- [ ] Documentar capacidades y casos de uso de EIP-4337
      Prioridad: Alta | Estado: Sin empezar
      Definir qué permite EIP-4337 y listar casos de uso prácticos

- [ ] Investigar herramientas existentes (Gnosis Safe, etc)
      Prioridad: Alta | Estado: Sin empezar
      Explorar y documentar herramientas para implementar EIP-4337

---

## Fase 2: Definición del Problema (2 Tareas)

- [ ] Describir el problema de wallet hereditaria
      Prioridad: Alta | Estado: Sin empezar
      Definir claramente cómo transferir activos cripto a herederos

- [ ] Definir múltiples beneficiarios con pesos
      Prioridad: Media | Estado: Sin empezar
      (NICE TO HAVE) Manejar múltiples beneficiarios con diferentes porcentajes

---

## Fase 3: Solución Técnica (1 Tarea)

- [ ] Investigar pago de GAS en tokens no nativos
      Prioridad: Alta | Estado: Sin empezar
      Explorar posibilidad de pagar gas usando tokens ERC-20 en lugar de ETH

---

## Fase 4: Arquitectura & Diseño (8 Tareas)

- [ ] Diseñar arquitectura del sistema
      Prioridad: Alta | Estado: Sin empezar
      Crear diagramas y documentación de la arquitectura general

### Sprint 2: Testing

- [ ] Unit Test: ConfigureInheritance validaciones
      Prioridad: Alta | Estado: Sin empezar
      Tests para validaciones, pesos inválidos, quórum

- [ ] Unit Test: Proof of Life y cancelación
      Prioridad: Alta | Estado: Sin empezar
      Tests para actualización de timestamp y cancelación

- [ ] Unit Test: Flujo de reclamación
      Prioridad: Alta | Estado: Sin empezar
      Tests para initiate, sign claim, contador

- [ ] Unit Test: Ejecución de payout
      Prioridad: Alta | Estado: Sin empezar
      Tests para quórum, período de gracia, distribución

- [ ] Unit Test: Cancelación y revalidación
      Prioridad: Media | Estado: Sin empezar
      Tests para propietario, revalidación, desinstalación

- [ ] Integration Test: Gasless con Paymaster
      Prioridad: Alta | Estado: Sin empezar
      Implementar firma sin ETH usando Paymaster

- [ ] Integration Test: Payout múltiples monedas
      Prioridad: Alta | Estado: Sin empezar
      Tests para batch atómico con múltiples tokens

---

## Filtros Rápidos

### Por Prioridad

- **Alta (15 tareas):** Críticas para MVP
- **Media (2 tareas):** Mejoras o NICE TO HAVE

### Por Estado

- **Sin empezar (22 tareas):** Listas para comenzar
- **En curso (0 tareas):** Actualmente en progreso
- **Listo (0 tareas):** Completadas

### Por Fecha

- **Sprint 1:** Semana 1 (Investigación)
- **Sprint 2:** Semana 2-3 (Backend + Testing)
- **Sprint 3:** Semana 4-5 (Frontend)
- **Sprint 4:** Semana 6-7 (Demo)

---

## Como Contribuir

1. Selecciona una tarea sin empezar
2. Cambia el estado a "En curso"
3. Trabaja en ella
4. Actualiza a "Listo" cuando termines
5. Haz push a GitHub

---

Última actualización: 15 Mayo 2026
