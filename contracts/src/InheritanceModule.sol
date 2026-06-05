// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

/**
 * @title InheritanceModule
 * @dev Módulo para Safe Accounts que gestiona la herencia digital.
 */
contract InheritanceModule {
    // --- Estructuras y Variables de Estado ---

    struct HeirConfig {
        uint256 weight; // Peso en puntos básicos (BPS, ej: 5000 = 50%)
        bool hasSigned; // Registro de firma del heredero para el quórum
    }

    address public owner; // El titular del Safe (propietario del módulo)
    address public oracle; // La dirección del Oráculo PKI autorizado
    uint256 public inactivityThreshold; // Tiempo requerido de inactividad (ej: 6 meses)
    uint256 public lastProofOfLife; // Timestamp de la última fe de vida
    uint256 public claimStartTimestamp; // Cuándo se inició el reclamo actual (0 si no está activo)
    uint256 public quorumRequired; // Quórum de firmas de herederos requerido para ejecutar
    uint256 public signedHeirsCount; // Contador actual de firmas de herederos

    address[] public heirsList;
    mapping(address => HeirConfig) public heirs;

    // --- Eventos ---
    event InheritanceConfigured(
        uint256 inactivityThreshold,
        uint256 quorumRequired
    );
    event ProofOfLifeSubmitted(uint256 timestamp);
    event ClaimInitiated(address initiator, uint256 timestamp);
    event ClaimSigned(address heir, uint256 currentSignatures);
    event PayoutExecuted(uint256 totalDistributed);
    event ClaimCancelled();

    // --- Modificadores ---
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call");
        _;
    }

    modifier onlyOracle() {
        require(msg.sender == oracle, "Only oracle can call");
        _;
    }

    constructor(address _oracle) {
        oracle = _oracle;
        owner = msg.sender; // Inicialmente asignado al deployer
        lastProofOfLife = block.timestamp;
    }

    // --- Funciones Core (Vacías para implementar lógica en Semana 2) ---

    /**
     * @notice Configura los herederos y umbrales. Llamado por el oráculo.
     */
    function configureInheritance(
        address[] calldata _heirs,
        uint256[] calldata _weights,
        uint256 _inactivityThreshold,
        uint256 _quorum
    ) external onlyOracle {
        // TODO: Validar pesos sumen 10000 BPS, configurar variables y emitir evento.
    }

    /**
     * @notice El titular renueva su fe de vida. Resetea claims activos.
     */
    function submitProofOfLife() external onlyOwner {
        // TODO: Actualizar lastProofOfLife y resetear claim en curso.
    }

    /**
     * @notice Inicia el período de gracia si se superó el inactividadThreshold.
     */
    function initiateClaim() external {
        // TODO: Validar inactividad y arrancar el período de gracia.
    }

    /**
     * @notice Registra la firma de un beneficiario para el quórum.
     */
    function signClaim() external {
        // TODO: Validar que sea heredero, registrar firma e incrementar contador.
    }

    /**
     * @notice Distribuye los fondos del Safe a los herederos y deshabilita el módulo.
     */
    function executePayout() external {
        // TODO: Validar quórum y tiempo, transferir ETH/ERC20 y desinstalar módulo.
    }

    /**
     * @notice Cancela el reclamo activo dentro del período de gracia (14 días).
     */
    function cancelClaim() external onlyOwner {
        // TODO: Limpiar estado del claim.
    }
}
