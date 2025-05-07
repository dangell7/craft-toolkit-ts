

##

`$ hooks-cli compile-c contracts/toolbox/base.c build`

## Debug

`$ tail -f config/debug.log 2>&1 | grep -E --color=always 'ContractTrace|ContractError|Publishing ledger [0-9]+'`