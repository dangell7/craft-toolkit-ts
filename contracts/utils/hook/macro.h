#include <stdint.h>
#include "host_lib.h"

#ifndef MACROS_INCLUDED
#define MACROS_INCLUDED 1

#define DEBUG 1

#define PRINT_NUMBER(v) do { \
    int64_t num = (int64_t)(v); \
    print((int)&num, sizeof(num)); \
} while(0)

#endif