## Run

## Build

`$ cargo build --manifest-path contracts/base/Cargo.toml --target wasm32v1-none --release --target-dir ./build/base`

## Debug

`$ tail -f smartnet/config/debug.log 2>&1 | grep -E --color=always 'WAMR|ContractError|Publishing ledger [0-9]+'`