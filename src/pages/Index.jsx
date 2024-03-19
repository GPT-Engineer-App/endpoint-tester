import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Heading, Input, Select, Textarea, VStack, Code, useToast } from "@chakra-ui/react";

const Index = () => {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const requestOptions = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (method !== "GET" && body) {
        requestOptions.body = body;
      }

      const res = await fetch(url, requestOptions);
      const data = await res.json();

      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while fetching data.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    setLoading(false);
  };

  return (
    <Box maxWidth="800px" margin="auto" padding={8}>
      <Heading as="h1" size="xl" textAlign="center" marginBottom={8}>
        Endpoint Tester
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl id="url">
            <FormLabel>URL</FormLabel>
            <Input type="url" value={url} onChange={(e) => setUrl(e.target.value)} required />
          </FormControl>
          <FormControl id="method">
            <FormLabel>Method</FormLabel>
            <Select value={method} onChange={(e) => setMethod(e.target.value)}>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </Select>
          </FormControl>
          <FormControl id="body">
            <FormLabel>Body (JSON)</FormLabel>
            <Textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder='{ "key": "value" }' />
          </FormControl>
          <Button type="submit" colorScheme="blue" isLoading={loading}>
            Send
          </Button>
        </VStack>
      </form>
      {response && (
        <Box marginTop={8}>
          <Heading as="h2" size="lg" marginBottom={4}>
            Response
          </Heading>
          <Code display="block" whiteSpace="pre">
            {response}
          </Code>
        </Box>
      )}
    </Box>
  );
};

export default Index;
