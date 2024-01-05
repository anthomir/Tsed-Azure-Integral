from flask import Flask, jsonify
import math

app = Flask(__name__)
port = 80

@app.route('/numericalintegralservice/<string:lower>/<string:upper>')
def numerical_integral_service(lower, upper):
    try:
        lower = float(lower)
        upper = float(upper)
    except ValueError:
        return jsonify({'error': 'Invalid input. Please provide numeric values for lower and upper bounds.'}), 400

    iterations = [10, 100, 1000, 10000, 100000, 1000000]
    results = []

    for N in iterations:
        delta_x = (upper - lower) / N
        result = 0.0

        for i in range(N):
            x_i = lower + i * delta_x
            result += abs(math.sin(x_i)) * delta_x

        results.append({'N': N, 'result': result})

    return jsonify(results)

if __name__ == '__main__':
    app.run(port=port, debug=True)
