use wasm_bindgen::prelude::*;

/// Result structure for 2-link / 3-link analytical arm kinematics
#[wasm_bindgen]
#[derive(Debug, Clone, Copy)]
pub struct KinematicsSolution {
    pub theta1_deg: f64,
    pub theta2_deg: f64,
    pub reachable: bool,
}

/// Analytical planar/spherical Inverse Kinematics solver in pure Rust
/// Solves shoulder and elbow angles for a 2-link manipulator
#[wasm_bindgen]
pub fn solve_inverse_kinematics(target_x: f64, target_y: f64, l1: f64, l2: f64) -> KinematicsSolution {
    let r_sq = target_x * target_x + target_y * target_y;
    let r = r_sq.sqrt();

    // Check reach boundary
    if r > (l1 + l2) || r < (l1 - l2).abs() || r == 0.0 {
        return KinematicsSolution {
            theta1_deg: 0.0,
            theta2_deg: 0.0,
            reachable: false,
        };
    }

    // Law of cosines for elbow angle theta2
    let cos_theta2 = (r_sq - l1 * l1 - l2 * l2) / (2.0 * l1 * l2);
    let cos_theta2_clamped = cos_theta2.max(-1.0).min(1.0);
    let theta2_rad = -cos_theta2_clamped.acos(); // Elbow-up configuration

    // Angle from origin to target
    let alpha = target_y.atan2(target_x);

    // Angle between l1 and r vector
    let beta = (l2 * theta2_rad.sin()).atan2(l1 + l2 * theta2_rad.cos());
    let theta1_rad = alpha - beta;

    KinematicsSolution {
        theta1_deg: theta1_rad.to_degrees(),
        theta2_deg: theta2_rad.to_degrees(),
        reachable: true,
    }
}

/// Result structure for Ackermann steering geometry
#[wasm_bindgen]
#[derive(Debug, Clone, Copy)]
pub struct AckermannResult {
    pub inner_angle_deg: f64,
    pub outer_angle_deg: f64,
    pub turning_radius_m: f64,
}

/// Ackermann Vehicle Steering Kinematics (Baja SAE / Formula design)
#[wasm_bindgen]
pub fn calculate_ackermann(
    wheelbase_m: f64,
    track_width_m: f64,
    steer_input_deg: f64,
    ackermann_percent: f64,
) -> AckermannResult {
    let steer_rad = steer_input_deg.to_radians();
    if steer_rad.abs() < 1e-4 {
        return AckermannResult {
            inner_angle_deg: 0.0,
            outer_angle_deg: 0.0,
            turning_radius_m: f64::INFINITY,
        };
    }

    // Ideal Ackermann equations
    let cot_mean = 1.0 / steer_rad.tan();
    let cot_inner = cot_mean - (track_width_m / (2.0 * wheelbase_m));
    let cot_outer = cot_mean + (track_width_m / (2.0 * wheelbase_m));

    let ideal_inner = (1.0 / cot_inner).atan().to_degrees();
    let ideal_outer = (1.0 / cot_outer).atan().to_degrees();

    // Scale with percentage (e.g. 78% modified Ackermann)
    let factor = (ackermann_percent / 100.0).clamp(0.0, 1.5);
    let final_inner = ideal_inner * factor;
    let final_outer = ideal_outer * factor;
    let radius = wheelbase_m / steer_rad.sin().abs();

    AckermannResult {
        inner_angle_deg: final_inner,
        outer_angle_deg: final_outer,
        turning_radius_m: radius,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_ik_horizontal_reach() {
        let l1 = 200.0;
        let l2 = 150.0;
        let sol = solve_inverse_kinematics(300.0, 0.0, l1, l2);
        assert!(sol.reachable);
        assert!(sol.theta1_deg > -90.0 && sol.theta1_deg < 90.0);
    }

    #[test]
    fn test_unreachable_point() {
        let sol = solve_inverse_kinematics(500.0, 500.0, 100.0, 100.0);
        assert!(!sol.reachable);
    }

    #[test]
    fn test_ackermann_straight() {
        let res = calculate_ackermann(1.5, 1.2, 0.0, 78.0);
        assert_eq!(res.inner_angle_deg, 0.0);
        assert_eq!(res.outer_angle_deg, 0.0);
    }
}
