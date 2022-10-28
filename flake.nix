{
  description = "A development environment for the Captain CLI";

  inputs.flake-utils.url = "github:numtide/flake-utils";
  inputs.nixpkgs.url = "github:nixos/nixpkgs/nixos-22.05";

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let pkgs = import nixpkgs { system = system; };
      in
      {
        formatter = pkgs.nixpkgs-fmt;
        devShell = pkgs.mkShell { packages = with pkgs; [ jq nodejs ]; };
      });
}
