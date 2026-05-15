# Preguntas sin Resolver

Lista de 15 preguntas críticas que necesitan respuesta antes de proceder a implementación completa.

## Decisiones Técnicas

1. **¿Cuál será el oráculo?**
   - Chainlink (descentralizado, costoso)
   - Solución custom (control total, más riesgo)
   - Hybrid approach (mix de ambos)

   Status: ABIERTO

2. **¿Cadena elegida?**
   - Ethereum Mainnet (máxima seguridad, alto costo gas)
   - Polygon (bajo costo, rápido)
   - Arbitrum (rollup optimístico)
   - Multi-chain desde el inicio

   Status: ABIERTO

3. **¿Testamento = ley suprema?**
   - La app solo ejecuta lo del testamento notarial
   - La app permite sobrescrituras digitales
   - Híbrido (testamento base, ajustes menores en app)

   Status: ABIERTO

4. **¿Qué pasa si el testamento cambia después de activar herencia digital?**
   - ¿Se requiere nueva validación PKI?
   - ¿Se pueden modificar beneficiarios en app sin renotarizar?

   Status: ABIERTO

5. **¿Cómo se revoca una herencia activa?**
   - ¿Titular puede desinstalar módulo en cualquier momento?
   - ¿Se pierde la configuración o se guarda?

   Status: ABIERTO

6. **¿Período de inactividad configurable?**
   - ¿6 meses fijos o variable por usuario?
   - ¿Cómo se comunica al titular?
   - ¿Recordatorios automáticos?

   Status: ABIERTO

## Decisiones Legales

7. **¿Responsabilidad legal si el oráculo falla?**
   - ¿Quién es responsable? (Fortris, oráculo, usuario)
   - ¿Hay mecanismo de recuperación?

   Status: ABIERTO

8. **¿GDPR compliant para datos de beneficiarios?**
   - ¿Dónde se almacenan?
   - ¿Quién puede acceder?
   - ¿Derecho al olvido?

   Status: ABIERTO

9. **¿El heredero puede impugnar la herencia on-chain?**
   - ¿Hay mecanismo de disputa?
   - ¿Quién arbitra?
   - ¿Medidas legales offline?

   Status: ABIERTO

10. **¿Herederos menores de edad (< 18 años)?**
    - ¿Vesting automático hasta mayor edad?
    - ¿Guardián que firme por ellos?
    - ¿Control parental?

    Status: ABIERTO

## Decisiones de Negocio

11. **¿Costos notariales?**
    - ¿Fortris absorbe o usuario paga?
    - ¿Comisión por heredero?
    - ¿Modelo de ingresos?

    Status: ABIERTO

12. **¿Revalidación periódica del certificado?**
    - ¿Cada cuánto debe renovarse?
    - ¿Automático o manual?
    - ¿Aviso al usuario?

    Status: ABIERTO

## Casos Extremos

13. **¿Qué pasa si la mayoría de herederos desaparecen?**
    - ¿El quórum se vuelve imposible?
    - ¿Mecanismo de fallback?

    Status: ABIERTO

14. **¿Múltiples reclamaciones simultáneas de diferentes cadenas?**
    - ¿Se pueden sincronizar o son independientes?
    - ¿Cross-chain messaging?

    Status: ABIERTO

15. **¿Recovery si se pierde acceso a passkey?**
    - ¿Mecanismo de backup?
    - ¿Guardianship temporal?
    - ¿Social recovery?

    Status: ABIERTO

---

## Próximo Paso

Presentar estas preguntas a:

- Tutores del proyecto
- Expertos legales
- Expertos en blockchain

Y documentar las respuestas en este archivo.

---

Última actualización: 15 Mayo 2026
