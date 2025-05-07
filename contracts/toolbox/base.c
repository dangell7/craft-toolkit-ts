#include "host_lib.h"

// int ready()
// {
//     uint32_t ledgerSqn = getLedgerSqn();
//     PRINT_DATA(ledgerSqn);
//     return getLedgerSqn() >= 5;
// }

#define UINT32_TO_BUF(buf_raw, i)\
{\
    unsigned char* buf = (unsigned char*)buf_raw;\
    buf[0] = (((uint64_t)i) >> 24) & 0xFFUL;\
    buf[1] = (((uint64_t)i) >> 16) & 0xFFUL;\
    buf[2] = (((uint64_t)i) >>  8) & 0xFFUL;\
    buf[3] = (((uint64_t)i) >>  0) & 0xFFUL;\
}

#define DEBUG 1

#define TRACEVAR(v) if (DEBUG) traceNumber((uint32_t)(#v), (uint32_t)(sizeof(#v) - 1), (int64_t)v);

int ready()
{
    int32_t ledgerSqn = getLedgerSqn();
    TRACEVAR(ledgerSqn);
    return 1;
}