// Import the useState hook from react
import { useState } from 'react';

// Create a functional component called App
function App() {
    return (
        <div style={styles.app}>
            <h1 style={styles.title}>React Hooks</h1>
            <p style={styles.subtitle}>Counter Example with useState </p>

            {/* Render the Counter component */}
            <Counter />
        </div>
    );
}

// Create a functional component called Counter
function Counter() {
    // Create a state variable called count and a function to update it called setCount
    const [count, setCount] = useState(0);

    // Define min and max limits for the counter
    const MIN_COUNT = -10;
    const MAX_COUNT = 10;

    // function to increase the count by 1
    function increaseCount() {
        // Use functional update to avoid stale closure issues
        setCount((prevCount) => {
            const newCount = prevCount + 1;
            return newCount <= MAX_COUNT ? newCount : prevCount;
        });
    }

    // function to decrease the count by 1
    function decreaseCount() {
        // Use functional update to avoid stale closure issues
        setCount((prevCount) => {
            const newCount = prevCount - 1;
            return newCount >= MIN_COUNT ? newCount : prevCount;
        });
    }

    // function to reset the count to 0
    function resetCount() {
        // Update the count state variable to 0
        setCount(0);
    }

    // Determine the color of the count based on its value
    const countColor = count > 0 ? '#2ecc71' : count < 0 ? '#e74c3c' : '#2c3e50';

    return (
        <div style={styles.counterContainer}>
            {/* Display the count state variable with dynamic color */}
            <div style={styles.countWrapper}>
                <span style={{ ...styles.count, color: countColor }}>{count}</span>
            </div>

            {/* Button controls */}
            <div style={styles.buttonGroup}>
                <button
                    onClick={decreaseCount}
                    disabled={count <= MIN_COUNT}
                    style={{
                        ...styles.button,
                        ...styles.buttonDecrease,
                        ...(count <= MIN_COUNT ? styles.buttonDisabled : {}),
                    }}
                    aria-label="Decrease count by 1"
                >
                    −
                </button>

                <button
                    onClick={resetCount}
                    style={styles.buttonReset}
                    aria-label="Reset count to 0"
                >
                    ⟲ Reset
                </button>

                <button
                    onClick={increaseCount}
                    disabled={count >= MAX_COUNT}
                    style={{
                        ...styles.button,
                        ...styles.buttonIncrease,
                        ...(count >= MAX_COUNT ? styles.buttonDisabled : {}),
                    }}
                    aria-label="Increase count by 1"
                >
                    +
                </button>
            </div>

            {/* Display current range info */}
            <p style={styles.rangeInfo}>
                Range: {MIN_COUNT} to {MAX_COUNT}
            </p>

            {/* Keyboard shortcut hint */}
            <p style={styles.shortcutHint}>
                ⌨️ Use <kbd>↑</kbd> / <kbd>↓</kbd> or <kbd>+</kbd> / <kbd>-</kbd> keys
            </p>
        </div>
    );
}

// Inline styles for better visual presentation
const styles = {
    app: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        padding: '20px',
        margin: 0,
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 700,
        color: '#2c3e50',
        marginBottom: '4px',
    },
    subtitle: {
        fontSize: '1.1rem',
        color: '#7f8c8d',
        marginTop: '0',
        marginBottom: '32px',
    },
    counterContainer: {
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        padding: '40px 48px 32px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.04)',
        textAlign: 'center',
        maxWidth: '420px',
        width: '100%',
        transition: 'box-shadow 0.3s ease',
    },
    countWrapper: {
        marginBottom: '28px',
        padding: '16px 0',
    },
    count: {
        fontSize: '6rem',
        fontWeight: 700,
        lineHeight: 1.2,
        transition: 'color 0.3s ease, transform 0.2s ease',
        display: 'inline-block',
        minWidth: '120px',
        fontVariantNumeric: 'tabular-nums',
    },
    buttonGroup: {
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    button: {
        padding: '14px 28px',
        fontSize: '1.5rem',
        fontWeight: 600,
        border: 'none',
        borderRadius: '14px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        minWidth: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
    },
    buttonIncrease: {
        backgroundColor: '#2ecc71',
        color: '#fff',
        boxShadow: '0 4px 14px rgba(46, 204, 113, 0.35)',
    },
    buttonIncreaseHover: {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 24px rgba(46, 204, 113, 0.45)',
    },
    buttonDecrease: {
        backgroundColor: '#e74c3c',
        color: '#fff',
        boxShadow: '0 4px 14px rgba(231, 76, 60, 0.35)',
    },
    buttonDecreaseHover: {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 24px rgba(231, 76, 60, 0.45)',
    },
    buttonReset: {
        backgroundColor: '#ecf0f1',
        color: '#2c3e50',
        padding: '14px 24px',
        fontSize: '1rem',
        fontWeight: 600,
        border: 'none',
        borderRadius: '14px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    },
    buttonResetHover: {
        backgroundColor: '#d5dbdb',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
    },
    buttonDisabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
        transform: 'none !important',
        boxShadow: 'none !important',
    },
    rangeInfo: {
        marginTop: '20px',
        fontSize: '0.85rem',
        color: '#95a5a6',
        letterSpacing: '0.3px',
    },
    shortcutHint: {
        marginTop: '12px',
        fontSize: '0.8rem',
        color: '#bdc3c7',
        marginBottom: '0',
    },
};

// Add hover styles via a style tag (alternative: use CSS classes)
// We'll add a style tag for hover effects since inline styles don't support :hover
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    button[style*="background-color: #2ecc71"]:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(46, 204, 113, 0.45) !important;
    }
    button[style*="background-color: #e74c3c"]:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(231, 76, 60, 0.45) !important;
    }
    button[style*="background-color: #ecf0f1"]:hover:not(:disabled) {
      background-color: #d5dbdb !important;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08) !important;
    }
    .count-animate {
      animation: pop 0.2s ease;
    }
    @keyframes pop {
      0% { transform: scale(1); }
      50% { transform: scale(1.08); }
      100% { transform: scale(1); }
    }
  `;
document.head.appendChild(styleSheet);

export default App;