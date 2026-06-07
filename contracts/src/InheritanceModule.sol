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
        _onlyOwner();
        _;
    }

    modifier onlyOracle() {
        _onlyOracle();
        _;
    }

    function _onlyOwner() internal view {
        require(msg.sender == owner, "Only owner can call");
    }

    function _onlyOracle() internal view {
        require(msg.sender == oracle, "Only oracle can call");
    }

    constructor(address _oracle, address _safe) {
        oracle = _oracle;
        owner = _safe;
        lastProofOfLife = block.timestamp;
    }

    // --- Funciones Core (Vacías para implementar lógica en Día 2) ---

    /**
     * @notice Configura los herederos y umbrales. Llamado por el oráculo.
     */
    function configureInheritance(
        address[] calldata _heirs,
        uint256[] calldata _weights,
        uint256 _inactivityThreshold,
        uint256 _quorum
    ) external onlyOracle {
        require(_heirs.length == _weights.length, "Arrays length mismatch");
        require(_heirs.length > 0, "No heirs configured");
        require(_quorum > 0 && _quorum <= _heirs.length, "Invalid quorum");
        require(_inactivityThreshold > 0, "Invalid inactivity threshold");
        // Limpiar configuración previa de herederos si existía
        for (uint256 i = 0; i < heirsList.length; i++) {
            delete heirs[heirsList[i]];
        }
        delete heirsList;
        uint256 totalWeight = 0;
        for (uint256 i = 0; i < _heirs.length; i++) {
            require(_heirs[i] != address(0), "Invalid heir address");
            require(_weights[i] > 0, "Weight must be greater than 0");
            totalWeight += _weights[i];

            heirs[_heirs[i]] = HeirConfig({
                weight: _weights[i],
                hasSigned: false
            });
            heirsList.push(_heirs[i]);
        }

        require(totalWeight == 10000, "Weights must sum to 10000 BPS");
        inactivityThreshold = _inactivityThreshold;
        quorumRequired = _quorum;
        lastProofOfLife = block.timestamp;
        claimStartTimestamp = 0;
        signedHeirsCount = 0;
        emit InheritanceConfigured(_inactivityThreshold, _quorum);
    }

    /**
     * @notice El titular renueva su fe de vida. Resetea claims activos.
     */
    function submitProofOfLife() external onlyOwner {
        lastProofOfLife = block.timestamp;

        if (claimStartTimestamp > 0) {
            claimStartTimestamp = 0;
            signedHeirsCount = 0;
            for (uint256 i = 0; i < heirsList.length; i++) {
                heirs[heirsList[i]].hasSigned = false;
            }
            emit ClaimCancelled();
        }

        emit ProofOfLifeSubmitted(block.timestamp);
    }

    /**
     * @notice Inicia el período de gracia si se superó el inactividadThreshold.
     */
    function initiateClaim() external {
        require(heirs[msg.sender].weight > 0, "Not a designated heir");
        require(inactivityThreshold > 0, "Inheritance not configured");
        require(
            block.timestamp > lastProofOfLife + inactivityThreshold,
            "Owner is not inactive yet"
        );
        require(claimStartTimestamp == 0, "Claim already initiated");
        claimStartTimestamp = block.timestamp;
        heirs[msg.sender].hasSigned = true;
        signedHeirsCount = 1;
        emit ClaimInitiated(msg.sender, block.timestamp);
        emit ClaimSigned(msg.sender, 1);
    }

    /**
     * @notice Registra la firma de un beneficiario para el quórum.
     */
    function signClaim() external {
        require(claimStartTimestamp > 0, "Claim not initiated");
        require(
            block.timestamp <= claimStartTimestamp + 14 days,
            "Grace period expired"
        );
        require(heirs[msg.sender].weight > 0, "Not a designated heir");
        require(!heirs[msg.sender].hasSigned, "Already signed");
        heirs[msg.sender].hasSigned = true;
        signedHeirsCount++;
        emit ClaimSigned(msg.sender, signedHeirsCount);
    }

    /**
     * @notice Distribuye los fondos del Safe a los herederos según los pesos configurados.
     * @param _assets Lista de direcciones de tokens ERC20 a distribuir (usa address(0) para ETH nativo).
     */
    function executePayout(address[] calldata _assets) external {
        require(claimStartTimestamp > 0, "Claim not initiated");
        require(
            block.timestamp <= claimStartTimestamp + 14 days,
            "Grace period expired"
        );
        require(signedHeirsCount >= quorumRequired, "Quorum not reached");
        for (uint256 j = 0; j < _assets.length; j++) {
            address asset = _assets[j];
            if (asset == address(0)) {
                // Distribución de ETH nativo
                uint256 totalBalance = address(owner).balance;
                if (totalBalance > 0) {
                    for (uint256 i = 0; i < heirsList.length; i++) {
                        address heir = heirsList[i];
                        uint256 amount = (totalBalance * heirs[heir].weight) /
                            10000;
                        if (amount > 0) {
                            require(
                                ISafe(owner).execTransactionFromModule(
                                    heir,
                                    amount,
                                    "",
                                    ISafe.Operation.Call
                                ),
                                "ETH transfer failed"
                            );
                        }
                    }
                }
            } else {
                // Distribución de Tokens ERC20
                uint256 totalBalance = IERC20(asset).balanceOf(owner);
                if (totalBalance > 0) {
                    for (uint256 i = 0; i < heirsList.length; i++) {
                        address heir = heirsList[i];
                        uint256 amount = (totalBalance * heirs[heir].weight) /
                            10000;
                        if (amount > 0) {
                            bytes memory data = abi.encodeWithSelector(
                                IERC20.transfer.selector,
                                heir,
                                amount
                            );
                            require(
                                ISafe(owner).execTransactionFromModule(
                                    asset,
                                    0,
                                    data,
                                    ISafe.Operation.Call
                                ),
                                "ERC20 transfer failed"
                            );
                        }
                    }
                }
            }
        }
        // Reseteamos el estado de reclamación tras la ejecución
        claimStartTimestamp = 0;
        emit PayoutExecuted(address(owner).balance);
    }

    /**
     * @notice Cancela el reclamo activo dentro del período de gracia (14 días).
     */
    function cancelClaim() external onlyOwner {
        require(claimStartTimestamp > 0, "No active claim");

        claimStartTimestamp = 0;
        signedHeirsCount = 0;
        for (uint256 i = 0; i < heirsList.length; i++) {
            heirs[heirsList[i]].hasSigned = false;
        }

        emit ClaimCancelled();
    }
}

// --- Interfaces para interactuar con Safe e ERC20 ---
interface ISafe {
    enum Operation {
        Call,
        DelegateCall
    }

    function execTransactionFromModule(
        address to,
        uint256 value,
        bytes calldata data,
        Operation operation
    ) external returns (bool success);
}

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);

    function transfer(address to, uint256 value) external returns (bool);
}
