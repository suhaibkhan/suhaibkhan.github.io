---
title: "Find Strings – Interview Street Challenge"
date:   2012-10-25 18:00:00 +0530
---
[Interview Street][interviewstreet] has a nice set of challenging programming problems which surely helps to improve our programming skills. Last night i was trying to solve a problem named `Find Strings` under the `String Processing` challenges and ended up with the following solution coded in java. You can find the problem statement [here][problem-link].

```java

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;

/**
 * @author Suhaib Khan
 */
public class Solution {

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(
                new InputStreamReader(System.in));

        int noOfStrings = Integer.parseInt(br.readLine());
        String[] strings = new String[noOfStrings];
        for (int i = 0; i < noOfStrings; i++) {
            strings[i] = br.readLine();
        }

        int noOfTests = Integer.parseInt(br.readLine());
        int[] tests = new int[noOfTests];
        for (int i = 0; i < noOfTests; i++) {
            tests[i] = Integer.parseInt(br.readLine());
        }

        HashMap<String, Integer> subStrings = new HashMap<>();
        for (int k = 0; k < noOfStrings; k++) {
            for (int i = 0; i < strings[k].length(); i++) {
                for (int j = i + 1; j <= strings[k].length(); j++) {
                    //System.out.println("i = "+ i + " j = " + j);
                    String substr = strings[k].substring(i, j);
                    int count = 1;
                    if (subStrings.containsKey(substr)) {
                        count += subStrings.get(substr);
                    }
                    subStrings.put(substr, count);
                }
            }
        }

        ArrayList substrs = new ArrayList<>();
        substrs.addAll(subStrings.keySet());
        Collections.sort(substrs);
        for (int i = 0; i < noOfTests; i++) {
            int index = tests[i];
            if (index <= substrs.size()) {
                System.out.println(substrs.get(index - 1));
            } else {
                System.out.println("INVALID");
            }
        }
    }
}
```

Even though this one works (only for 3/7 of their testcases), i have to find a faster method to solve this problem with in the time limit.

[interviewstreet]: https://www.interviewstreet.com/
[problem-link]: https://www.interviewstreet.com/challenges/dashboard/#problem/4efa210eb70ac
