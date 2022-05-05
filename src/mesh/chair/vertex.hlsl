#version 300 es
in vec4 a_position;
in vec3 a_normal;

uniform mat4 u_matrix;
//uniform mat4 u_projection;
//uniform mat4 u_view;
//uniform mat4 u_world;

out vec3 v_normal;

void main() {
  // u_projection * u_view *
  gl_Position = u_matrix * a_position;
  v_normal = mat3(u_matrix) * a_normal;
}