import { ref, onMounted } from 'vue';
import { createClient } from 'contentful';
import { useListAction } from './useListAction';

const client = createClient({
    space: "hpr0uushokd4",
    accessToken: "jwEHepvQx-kMtO7_2ldjhE4WMAsiDp3t1xxBT8aDp7U"
});

export function useBlogs() {
    const blogs = ref([]);
    const isLoading = ref(true);
    const error = ref(null);
    
    const { addItem, deleteItem } = useListAction(blogs);

    onMounted(async () => {
        try {
            const response = await client.getEntries({
                content_type: "blogPost",
                order: "-fields.publishDate",
              });
            blogs.value = response.items.map((item) => ({
                ...item.fields,
                id: item.fields.slug,
              }));
        } catch (err) {
            error.value = err;
        } finally {
            isLoading.value = false;
        }
    });

    return {
        blogs,
        isLoading,
        error,
        addItem,
        deleteItem
    };
}